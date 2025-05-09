// /controllers/comments.ts
import prisma from '../models/client';
import { Context } from 'koa';
import { TypedContext } from '../types/koa-context';
import { CreateCommentBody, VoteBody } from 'types/comments';

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

export async function getCommentsByTag(
  ctx: Context
): Promise<{ status: number; body: any }> {
  const tagId = ctx.query.tagId?.toString();
  const sortBy = ctx.query.sortBy?.toString() || 'latest'; // 'latest' or 'hot'
  const page = parseInt(ctx.query.page?.toString() || '1');
  const pageSize = parseInt(ctx.query.pageSize?.toString() || '10');

  if (!tagId) {
    return {
      status: 400,
      body: { error: 'tagId is required' }, // 返回错误信息
    };
  }

  const comments = await prisma.comment.findMany({
    where: {
      tags: {
        some: {
          id: tagId,
        },
      },
      parentId: null, // 只返回主评论（不嵌套）
    },
    orderBy:
      sortBy === 'hot'
        ? { likesCount: 'desc' }
        : { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      tags: true,
      _count: { select: { replies: true } },
    },
  });
  return {
    status: 200,
    body: {
      comments,
      page,
      pageSize,
    },
  };
}

export async function toggleLike(
  ctx: TypedContext<VoteBody>
): Promise<{ status: number; body: any }> {
  const { commentId, userId } = ctx.request.body;

  if (!commentId || !userId) {
    return {
      status: 400,
      body: { message: 'commentId and userId are required' },
    };
  }

  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_commentId: { userId, commentId },
    },
  });

  if (existingVote) {
    // 已点赞 → 取消点赞
    await prisma.$transaction([
      prisma.vote.delete({
        where: { userId_commentId: { userId, commentId } },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
      }),
    ]);

    return {
      status: 200,
      body: { message: 'Like removed', liked: false },
    };
  } else {
    // 未点赞 → 点赞
    await prisma.$transaction([
      prisma.vote.create({
        data: { userId, commentId },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: {
          likesCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return {
      status: 200,
      body: { message: 'Liked', liked: true },
    };
  }
}
