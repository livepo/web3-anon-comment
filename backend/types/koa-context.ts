import { Context } from 'koa';

/**
 * 用于将 `ctx.request.body` 指定为某种类型
 */
export type TypedContext<ReqBody = unknown> = Context & {
  request: Context['request'] & {
    body: ReqBody;
  };
};

export type FullTypedContext<
  ReqBody = unknown,
  Params = Record<string, string>,
  Query = Record<string, string | string[]>
> = Context & {
  request: Context['request'] & { body: ReqBody };
  params: Params;
  query: Query;
};
