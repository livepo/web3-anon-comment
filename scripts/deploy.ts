import { ethers } from 'hardhat';

async function main() {
  const CommentSystem = await ethers.getContractFactory(
    'CommentSystem'
  );
  const commentSystem = await CommentSystem.deploy();

  await commentSystem.waitForDeployment();
  const address = await commentSystem.getAddress();
  console.log(`✅ CommentSystem deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
