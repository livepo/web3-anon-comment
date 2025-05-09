curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "这是对上一级评论的回复",
    "ipfsHash": "QmExampleNestedHash",
    "contentHash": "0xabcdef1234567890",
    "userId": "ddf0210c-6356-4bb6-87f3-3703cb4738bc",
    "parentId": "9104ef38-80c3-4eec-84e0-0399bb70b113",
    "tagNames": ["技术讨论", "嵌套测试"]
  }'
