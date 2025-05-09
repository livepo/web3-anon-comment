import Router from 'koa-router';
import * as Auth from '../controllers/auth';
import bodyParser from 'koa-bodyparser';
import { VerifyBody, WalletLoginBody } from 'types/auth';

const router = new Router({ prefix: '/auth' });

router.use(bodyParser());

// Decprecated: Use the new endpoint
router.post('/login', async (ctx) => {
  const body = ctx.request.body as WalletLoginBody;
  const result = await Auth.walletLogin({
    ...ctx,
    request: { ...ctx.request, body },
  });
  ctx.status = result.status || 200; // Set the HTTP status code
  ctx.body = result.body || { message: 'Login successful' }; // Set the response body
});

router.get('/nonce', Auth.getNonce);

router.post('/verify', async (ctx) => {
  const body = ctx.request.body as VerifyBody;
  const result = await Auth.verifySignature({
    ...ctx,
    request: { ...ctx.request, body },
  });
  ctx.status = result.status || 200; // Set the HTTP status code
  ctx.body = result.body || { message: 'Verification successful' }; // Set the response body
});

export default router;
