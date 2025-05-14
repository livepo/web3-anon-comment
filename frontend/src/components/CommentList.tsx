import CommentCard from './CommentCard';

const mockComments = [
  {
    username: '匿名用户1',
    content: '我觉得这是一个很有潜力的项目，值得一试。',
    tags: ['技术', '区块链'],
    likes: 3,
  },
  {
    username: '匿名用户2',
    content: '能否支持 Ethereum 以外的链，比如 Arbitrum？',
    tags: ['提问', '扩展'],
    likes: 5,
  },
];

const CommentList = () => {
  return (
    <div className="space-y-4">
      {mockComments.map((comment, idx) => (
        <CommentCard key={idx} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
