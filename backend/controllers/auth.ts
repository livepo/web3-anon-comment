import { TypedContext } from '../types/koa-context';
import prisma from '../models/client';
import { WalletLoginBody } from 'types/auth';

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
