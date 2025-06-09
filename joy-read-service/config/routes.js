import express from 'express'
import indexRouter from '../routes/index.js'
import usersRouter from '../routes/users.js'
import apiArticlesRouter from '../routes/api/articles.js'

const router = express.Router()

router.use('/', indexRouter)
router.use('/users', usersRouter)
router.use('/api/articles', apiArticlesRouter)

export default router
