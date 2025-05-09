import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import commentRoutes from './backend/routes/comments';
import authRoutes from './backend/routes/auth';

const app = new Koa();
app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log(`Request: ${ctx.method} ${ctx.url}`);
  await next();
});

app.use(commentRoutes.routes());
app.use(commentRoutes.allowedMethods());
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  console.log('Registered routes:');
  commentRoutes.stack.forEach((route) => {
    console.log(`${route.methods.join(', ')} ${route.path}`);
  });
  authRoutes.stack.forEach((route) => {
    console.log(`${route.methods.join(', ')} ${route.path}`);
  });
});
