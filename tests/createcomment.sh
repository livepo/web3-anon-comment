curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "这是评论内容",
    "ipfsHash": "Qm...abc123",
    "contentHash": "0x1234567890abcdef",
    "userId": "ddf0210c-6356-4bb6-87f3-3703cb4738bc",
    "parentId": null,
    "tagNames": ["区块链", "匿名"]
  }'
