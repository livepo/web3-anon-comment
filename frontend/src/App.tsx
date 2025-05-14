import ForumLayout from './components/ForumLayout';
import CommentEditor from './components/CommentEditor';
import NestedCommentList from './components/NestedCommentList';
import UserSidebarCard from './components/UserSidebarCard';
import TagSidebarCard from './components/TagSidebarCard';
import { useState } from 'react';

const mockNestedComments = [
  {
    id: '1',
    username: '匿名1',
    content: '我觉得这想法很棒。',
    likes: 2,
    tags: ['技术'],
    children: [
      {
        id: '1-1',
        username: '匿名2',
        content: '我也有类似想法，可以交流下。',
        likes: 1,
        tags: [],
        children: [
          {
            id: '1-1-1',
            username: '匿名3',
            content: '具体实现上可以参考以太坊。',
            likes: 0,
            tags: [],
          },
        ],
      },
    ],
  },
];

const commonTags = [
  { id: '1', name: '区块链' },
  { id: '2', name: 'IPFS' },
  { id: '3', name: '匿名' },
  { id: '4', name: 'DAO' },
  { id: '5', name: 'Web3' },
];

function App() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <ForumLayout>
      <div className="flex p-4 gap-6">
        {/* 左侧主内容 */}
        <div className="w-[600px] flex-1 space-y-6">
          {/* ✅ 标签筛选条 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {commonTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() =>
                  setSelectedTag((prev) =>
                    prev === tag.id ? null : tag.id
                  )
                }
                className={`px-3 py-1 rounded-full text-sm border ${
                  selectedTag === tag.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                }`}
              >
                #{tag.name}
              </button>
            ))}
          </div>
          <h1 className="text-xl font-bold mb-4">讨论区</h1>
          <NestedCommentList comments={mockNestedComments} />
        </div>

        {/* 右侧侧边栏 */}
        <div className="w-[280px] space-y-6">
          <UserSidebarCard />
          <TagSidebarCard />
        </div>
      </div>
    </ForumLayout>
  );
}

export default App;
