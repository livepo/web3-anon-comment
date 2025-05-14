import { useState } from 'react';

const CommentEditor = ({
  onSubmit,
}: {
  onSubmit: (content: string) => void;
}) => {
  const [content, setContent] = useState('');

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的评论..."
        className="w-full resize-none rounded-md border p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
      />

      <div className="flex justify-end mt-3">
        <button
          onClick={() => {
            if (content.trim()) onSubmit(content);
            setContent('');
          }}
          className="rounded bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700"
        >
          发布
        </button>
      </div>
    </div>
  );
};

export default CommentEditor;
