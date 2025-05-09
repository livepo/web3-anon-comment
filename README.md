## 基于区块链的匿名评论社区（MVP）
目标：发帖内容 hash 上链 + 投票打赏

### 架构
```css
   [ 用户浏览器 ]
        │
        ▼
MetaMask / WalletConnect     IPFS  ←→ 评论内容
        │                    ▲
        ▼                    │
[ Next.js 前端 ] ─────→ [ Node.js 中间层 API ] ─────→ [ EVM 区块链 ]
                         │                       ▲
                         └─ MongoDB/PostgreSQL ──┘
                             （用户信息 + 评论索引 + 签名）
```

### 项目结构
```bash
web3-anon-comment/
├── contracts/               # Solidity 智能合约
│   └── CommentStorage.sol
├── frontend/                # Next.js 前端项目
│   ├── pages/
│   ├── components/
│   ├── utils/
│   └── wagmi.config.ts
├── backend/                 # Node.js API 服务
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── siwe-auth.js
├── ipfs/                    # IPFS 上传逻辑（Pinata SDK等）
├── prisma/                 # 数据库模型定义（如使用 PostgreSQL）
└── hardhat.config.js
```

### 开发环境
| 项目    | 推荐配置                             |
| ----- | -------------------------------- |
| 区块链开发 | Hardhat + Polygon Mumbai 测试网     |
| 钱包测试  | MetaMask / WalletConnect         |
| 内容存储  | IPFS via Pinata or Infura        |
| 部署    | Vercel (前端) + Render/Fly.io (后端) |
| 数据库   | MongoDB Atlas 或 Supabase         |


### 功能
| 需求       | 实现建议                       |
| -------- | -------------------------- |
| 点赞、投票    | 前端记录点赞者钱包地址，合约中记录投票行为      |
| ERC20 激励 | 使用 faucet 合约或空投方式奖励交互用户    |
| 防女巫机制    | 发帖收取极少 Gas，或要求 NFT Pass 门票 |
| 声誉系统     | 按钱包交互历史赋予隐式声誉值             |

### 技术选型
| 模块     | 技术选型                                       |
| ------ | ------------------------------------------ |
| 前端框架   | Next.js + TailwindCSS                      |
| 钱包连接   | RainbowKit + Wagmi + Ethers.js             |
| 区块链合约  | Solidity + Hardhat                         |
| 内容存储   | IPFS（via Infura/Pinata）或 Arweave           |
| 后端 API | Node.js (Koa/Express) + MongoDB/PostgreSQL |
| 登录认证   | SIWE（Sign-In With Ethereum）标准              |
| 区块链平台  | Polygon / Arbitrum（主网或测试网）                 |
