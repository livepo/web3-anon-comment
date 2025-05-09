// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CommentStorage {
    event CommentPosted(address indexed user, bytes32 indexed contentHash, uint256 timestamp);

    function postComment(bytes32 contentHash) external {
        emit CommentPosted(msg.sender, contentHash, block.timestamp);
    }
}
