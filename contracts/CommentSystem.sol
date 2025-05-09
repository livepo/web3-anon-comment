// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CommentSystem {
    struct Comment {
        uint256 id;
        address author;
        string ipfsHash;
        uint256 timestamp;
        uint256 parentId;
        string[] tags;
    }

    struct Vote {
        uint256 commentId;
        address voter;
        bool upvote;
    }

    uint256 public nextCommentId;

    mapping(uint256 => Comment) public comments;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => int256) public commentScores;

    event CommentPosted(
        uint256 indexed id,
        address indexed author,
        string ipfsHash,
        uint256 parentId,
        string[] tags
    );

    event Voted(
        uint256 indexed commentId,
        address indexed voter,
        bool upvote,
        int256 newScore
    );

    function postComment(string memory ipfsHash, uint256 parentId, string[] memory tags) public {
        comments[nextCommentId] = Comment({
            id: nextCommentId,
            author: msg.sender,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            parentId: parentId,
            tags: tags
        });

        emit CommentPosted(nextCommentId, msg.sender, ipfsHash, parentId, tags);

        nextCommentId++;
    }

    function vote(uint256 commentId, bool upvote) public {
        require(commentId < nextCommentId, "Comment does not exist");
        require(!hasVoted[commentId][msg.sender], "Already voted");

        hasVoted[commentId][msg.sender] = true;
        int256 delta = upvote ? int256(1) : -1;
        commentScores[commentId] += delta;

        emit Voted(commentId, msg.sender, upvote, commentScores[commentId]);
    }

    function getComment(uint256 commentId) public view returns (
        uint256 id,
        address author,
        string memory ipfsHash,
        uint256 timestamp,
        uint256 parentId,
        string[] memory tags,
        int256 score
    ) {
        Comment memory c = comments[commentId];
        return (
            c.id,
            c.author,
            c.ipfsHash,
            c.timestamp,
            c.parentId,
            c.tags,
            commentScores[commentId]
        );
    }
}
