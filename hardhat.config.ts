import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true, // 启用中间表示优化
    },
  },
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || '',
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
