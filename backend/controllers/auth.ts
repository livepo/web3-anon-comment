import { TypedContext } from '../types/koa-context';
import prisma from '../models/client';
import { VerifyBody, WalletLoginBody } from 'types/auth';
import { Context } from 'koa';
import { ethers } from 'ethers';
import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

export async function walletLogin(
  ctx: TypedContext<WalletLoginBody>
): Promise<{
  status: number;
  body: { message: string; user?: any };
}> {
  const { walletAddress } = ctx.request.body;

  if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return {
      status: 400,
      body: { message: 'Invalid wallet address' },
    };
  }

  const user = await prisma.user.upsert({
    where: { walletAddress },
    update: {},
    create: {
      walletAddress,
    },
  });

  return {
    status: 200,
    body: {
      message: 'Login successful',
      user,
    },
  };
}

export async function getNonce(ctx: Context): Promise<{
  status: number;
  body: { nonce?: string; message: string };
}> {
  const walletAddress = ctx.query.wallet?.toString();

  if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return {
      status: 400,
      body: { message: 'Invalid wallet address' },
    };
  }

  const user = await prisma.user.upsert({
    where: { walletAddress },
    update: {},
    create: {
      walletAddress: walletAddress,
      nonce: crypto.randomUUID(),
    },
  });

  return {
    status: 200,
    body: {
      nonce: user.nonce,
      message: 'Nonce retrieved successfully',
    },
  };
}

export async function verifySignature(
  ctx: TypedContext<VerifyBody>
): Promise<{
  status: number;
  body: { message: string; token?: string; user?: any };
}> {
  const { walletAddress, signature } = ctx.request.body;

  const user = await prisma.user.findUnique({
    where: { walletAddress },
  });

  if (!user) {
    return {
      status: 400,
      body: { message: 'User not found' },
    };
  }

  const message = `Login nonce: ${user.nonce}`;

  try {
    const recovered = ethers.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== walletAddress.toLowerCase()) {
      return {
        status: 401,
        body: { message: 'Signature verification failed' },
      };
    }

    // 重新生成 nonce 防止重放攻击
    const updated = await prisma.user.update({
      where: { walletAddress },
      data: { nonce: crypto.randomUUID() },
    });

    const token = jwt.sign(
      {
        userId: updated.id,
        walletAddress: updated.walletAddress,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as SignOptions
    );

    return {
      status: 200,
      body: {
        message: 'Login verified',
        token,
        user: updated,
      }, // Return the updated user
    };
  } catch (err) {
    return {
      status: 400,
      body: { message: 'Invalid signature' },
    };
  }
}
