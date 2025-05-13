import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import CommentSystemJson from '../../artifacts/contracts/CommentSystem.sol/CommentSystem.json';

dotenv.config();

const provider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contractAddress = process.env.CONTRACT_ADDRESS!;

const contract = new ethers.Contract(
  contractAddress,
  CommentSystemJson.abi,
  wallet // 用 wallet 连接以签名交易
);

export default contract;
