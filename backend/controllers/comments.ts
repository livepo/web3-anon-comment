// /controllers/comments.ts
import prisma from '../models/client';
import { Context } from 'koa';
import { TypedContext } from '../types/koa-context';
import { CreateCommentBody } from 'types/comments';

export async function createComment(
  ctx: TypedContext<CreateCommentBody>
): Promise<{ status: number; body: any }> {
  const {
    content,
    ipfsHash,
    contentHash,
    userId,
    parentId,
    tagNames,
  } = ctx.request.body;

  let depth = 0;
  let threadId = '';

  if (parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: parentId },
    });
    if (!parent) ctx.throw(400, '父评论不存在');
    if (parent.depth >= 2) ctx.throw(400, '超过最大嵌套层级');
    depth = parent.depth + 1;
    threadId = parent.threadId;
  } else {
    threadId = crypto.randomUUID(); // 顶层评论使用自身 id 作为 threadId
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      ipfsHash: ipfsHash || '',
      contentHash: contentHash || '',
      userId,
      parentId,
      depth,
      threadId,
      tags: {
        create: tagNames?.map((tag) => ({
          tag: {
            connectOrCreate: {
              where: { name: tag },
              create: { name: tag },
            },
          },
        })),
      },
    },
  });

  return {
    status: 201,
    body: {
      message: '评论成功',
      comment,
    },
  };
}

export async function listComments(ctx: Context) {
  const { tag, sort = 'new' } = ctx.query;

  const comments = await prisma.comment.findMany({
    where: {
      parentId: null,
      tags: tag
        ? {
            some: {
              tag: { name: Array.isArray(tag) ? { in: tag } : tag },
            },
          }
        : undefined,
    },
    orderBy:
      sort === 'hot' ? { likesCount: 'desc' } : { createdAt: 'desc' },
    include: {
      tags: { include: { tag: true } },
      user: true,
    },
  });

  ctx.body = comments;
}

export async function getThread(ctx: Context) {
  const { threadId } = ctx.params;

  const comments = await prisma.comment.findMany({
    where: { threadId },
    orderBy: { createdAt: 'asc' },
    include: {
      user: true,
      tags: { include: { tag: true } },
    },
  });

  ctx.body = comments;
}
