import React from 'react';
import CommentCard from './CommentCard';
import ReplyEditor from './ReplyEditor';

interface CommentNode {
  id: string;
  content: string;
  username: string;
  likes: number;
  tags: string[];
  children?: CommentNode[];
}

interface Props {
  comments: CommentNode[];
  depth?: number;
  maxDepth?: number;
  sortBy?: 'latest' | 'likes';
}

const sortComments: any = (
  comments: CommentNode[],
  sortBy: 'latest' | 'likes' = 'latest'
) => {
  const sorted = [...comments].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    return b.id.localeCompare(a.id); // 假设ID是时间顺序生成的，可换成 timestamp
  });

  return sorted.map((comment) => ({
    ...comment,
    children: comment.children
      ? sortComments(comment.children, sortBy)
      : [],
  }));
};

const NestedCommentList = ({
  comments,
  depth = 0,
  maxDepth = 3,
  sortBy = 'latest',
}: Props) => {
  const [collapsed, setCollapsed] = React.useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div
      className={`space-y-4 pl-${depth > 0 ? 4 : 0} border-l ${
        depth > 0 ? 'border-gray-200' : ''
      }`}
    >
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentCard
            username={comment.username}
            content={comment.content}
            tags={comment.tags}
            likes={comment.likes}
          />

          {/* 回复框（可展开） */}
          {depth < maxDepth && <ReplyEditor parentId={comment.id} />}

          {/* 递归渲染子评论 */}
          {comment.children && comment.children.length > 0 && (
            <div className="ml-4 mt-2">
              <button
                onClick={() =>
                  setCollapsed((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }))
                }
                className="text-xs text-gray-500 hover:underline"
              >
                {collapsed[comment.id]
                  ? '展开回复'
                  : `收起回复 (${comment.children.length})`}
              </button>

              {!collapsed[comment.id] && (
                <NestedCommentList
                  comments={comment.children}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                  sortBy={sortBy}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NestedCommentList;
