import Router from 'koa-router';
import * as Comments from '../controllers/comments';
import bodyParser from 'koa-bodyparser';
import { CreateCommentBody } from 'types/comments';

const router = new Router({ prefix: '/comments' });

router.use(bodyParser());

router.post('/', async (ctx, next) => {
  const body = ctx.request.body as CreateCommentBody; // Explicitly type the body
  await Comments.createComment({
    ...ctx,
    request: { ...ctx.request, body },
  });
  await next();
});

router.get('/', Comments.listComments);

router.get('/:threadId', Comments.getThread);

export default router;
