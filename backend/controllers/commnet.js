const ethers = require('ethers');
const ipfsClient = require('./ipfs'); // 自定义上传模块

app.post('/api/comment', async (req, res) => {
  const { content, walletAddress } = req.body;

  // 1. 上传内容到 IPFS
  const ipfsHash = await ipfsClient.upload(content);

  // 2. 生成 hash 并调用智能合约存证
  const contentHash = ethers.utils.keccak256(Buffer.from(content));

  await contract.postComment(contentHash); // 使用钱包私钥或中间服务代理

  // 3. 存入本地数据库（关联内容与 hash）
  await db.comments.insert({ walletAddress, content, ipfsHash });

  res.send({ success: true });
});

app.get('/api/comments', async (req, res) => {
  const { walletAddress } = req.query;

  // 1. 从数据库中获取评论
  const comments = await db.comments.find({ walletAddress });

  // 2. 返回评论列表
  res.send({ comments });
});
