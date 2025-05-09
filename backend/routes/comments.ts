import Router from 'koa-router';
import * as Comments from '../controllers/comments';
import bodyParser from 'koa-bodyparser';
import { CreateCommentBody } from 'types/comments';

const router = new Router({ prefix: '/comments' });

router.use(bodyParser());

router.post('/', async (ctx, next) => {
  const body = ctx.request.body as CreateCommentBody; // Explicitly type the body
  const result = await Comments.createComment({
    ...ctx,
    request: { ...ctx.request, body },
  });
  ctx.status = result.status || 200; // Set the HTTP status code
  ctx.body = result.body || {
    message: 'Comment created successfully',
  }; // Set the response body
});

router.get('/', Comments.listComments);

router.get('/:threadId', Comments.getThread);

export default router;
