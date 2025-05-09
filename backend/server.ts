import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import commentRoutes from './routes/comments'

const app = new Koa()
app.use(bodyParser())
app.use(commentRoutes.routes())

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})
