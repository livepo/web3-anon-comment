import { TypedContext } from '../types/koa-context';
import prisma from '../models/client';
import { WalletLoginBody } from 'types/auth';

export async function walletLogin(
  ctx: TypedContext<WalletLoginBody>
) {
  const { walletAddress } = ctx.request.body;

  if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid wallet address' };
    return;
  }

  const user = await prisma.user.upsert({
    where: { walletAddress },
    update: {},
    create: {
      walletAddress,
    },
  });

  ctx.status = 200;
  ctx.body = {
    message: 'Login successful',
    user,
  };
}
