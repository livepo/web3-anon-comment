interface CommentCardProps {
  username: string;
  content: string;
  tags: string[];
  likes: number;
  onLike?: () => void;
}

const CommentCard = ({
  username,
  content,
  tags,
  likes,
  onLike,
}: CommentCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="mb-2 text-sm text-gray-500">
        来自用户 {username}
      </div>

      <div className="prose prose-sm text-gray-800 mb-3">
        {content}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="space-x-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={onLike}
          className="rounded px-2 py-0.5 hover:bg-gray-100"
        >
          👍 {likes}
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
