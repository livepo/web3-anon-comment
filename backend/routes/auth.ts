import Router from 'koa-router';
import * as Auth from '../controllers/auth';
import bodyParser from 'koa-bodyparser';
import { WalletLoginBody } from 'types/auth';

const router = new Router({ prefix: '/auth' });

router.use(bodyParser());

router.post('/', async (ctx, next) => {
  const body = ctx.request.body as WalletLoginBody; // Explicitly type the body
  await Auth.walletLogin({
    ...ctx,
    request: { ...ctx.request, body },
  });
  await next();
});

export default router;
