import { useState } from 'react';

const ReplyEditor = ({ parentId }: { parentId: string }) => {
  const [content, setContent] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;

    console.log('提交评论至 parentId:', parentId, '内容:', content);
    setContent('');
    setExpanded(false);

    // 可调用上传 IPFS、上链、或 POST 至后端接口
  };

  return (
    <div className="mt-2 ml-4">
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          回复
        </button>
      ) : (
        <div className="mt-2 space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的回复..."
            className="w-full resize-none rounded-md border p-2 text-sm focus:ring-blue-400"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="rounded bg-blue-600 px-3 py-1 text-white text-sm hover:bg-blue-700"
            >
              发布
            </button>
            <button
              onClick={() => {
                setExpanded(false);
                setContent('');
              }}
              className="text-sm text-gray-500"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyEditor;
