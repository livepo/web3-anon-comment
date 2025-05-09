import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { error: 'Authorization header missing or malformed' };
    return;
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      walletAddress: string;
    };

    ctx.state.user = payload; // ⬅️ 附加 user 信息
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid or expired token' };
  }
}
