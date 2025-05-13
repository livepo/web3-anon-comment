curl -X POST http://localhost:3000/comments/vote \
  -H "Content-Type: application/json" \
  -d '{"commentId": "clx123abc456", "userId": "clu123user456"}'