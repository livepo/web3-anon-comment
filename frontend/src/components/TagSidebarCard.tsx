const mockTags = [
  { id: '1', name: '区块链', count: 12 },
  { id: '2', name: 'IPFS', count: 8 },
  { id: '3', name: '匿名', count: 5 },
];

const TagSidebarCard = () => {
  return (
    <div className="rounded-2xl shadow p-4 bg-white">
      <h2 className="text-base font-semibold mb-3">全部标签</h2>
      <div className="flex flex-wrap gap-2">
        {mockTags.map((tag) => (
          <div
            key={tag.id}
            className="rounded-lg bg-gray-100 px-3 py-1 text-sm hover:bg-blue-100 cursor-pointer"
          >
            #{tag.name} ({tag.count})
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSidebarCard;
