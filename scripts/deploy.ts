import { ethers } from "hardhat";

async function main() {
    const CommentSystem = await ethers.getContractFactory("CommentSystem");
    const commentSystem = await CommentSystem.deploy();

    await commentSystem.deployed();
    console.log(`✅ CommentSystem deployed to: ${commentSystem.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
