import Router from 'koa-router'
import * as Comments from '../controllers/comments'

const router = new Router({ prefix: '/comments' })

router.post('/', Comments.createComment)
router.get('/', Comments.listComments)
router.get('/:threadId', Comments.getThread)

export default router
