import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('CommentSystem', function () {
  let commentSystem: any;
  let owner: any;
  let user1: any;

  beforeEach(async () => {
    [owner, user1] = await ethers.getSigners();
    const CommentSystem = await ethers.getContractFactory(
      'CommentSystem'
    );
    commentSystem = await CommentSystem.deploy();
    await commentSystem.deployed();
  });

  it('should post a comment', async () => {
    const ipfsHash = 'QmExampleHash';
    const parentId = 0;
    const tags = ['web3', 'test'];

    await expect(commentSystem.postComment(ipfsHash, parentId, tags))
      .to.emit(commentSystem, 'CommentPosted')
      .withArgs(0, owner.address, ipfsHash, parentId, tags);

    const comment = await commentSystem.getComment(0);
    expect(comment.id).to.equal(0);
    expect(comment.author).to.equal(owner.address);
    expect(comment.ipfsHash).to.equal(ipfsHash);
    expect(comment.tags).to.deep.equal(tags);
    expect(comment.score).to.equal(0);
  });

  it('should allow upvoting a comment', async () => {
    await commentSystem.postComment('hash1', 0, []);
    await commentSystem.connect(user1).vote(0, true);

    const comment = await commentSystem.getComment(0);
    expect(comment.score).to.equal(1);
  });

  it('should allow downvoting a comment', async () => {
    await commentSystem.postComment('hash2', 0, []);
    await commentSystem.connect(user1).vote(0, false);

    const comment = await commentSystem.getComment(0);
    expect(comment.score).to.equal(-1);
  });

  it('should not allow duplicate voting', async () => {
    await commentSystem.postComment('hash3', 0, []);
    await commentSystem.connect(user1).vote(0, true);

    await expect(
      commentSystem.connect(user1).vote(0, true)
    ).to.be.revertedWith('Already voted');
  });

  it('should fail to vote on non-existent comment', async () => {
    await expect(
      commentSystem.connect(user1).vote(999, true)
    ).to.be.revertedWith('Comment does not exist');
  });
});
