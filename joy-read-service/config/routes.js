import express from 'express'
import indexRouter from '../routes/index.js'
import usersRouter from '../routes/users.js'
import apiArticlesRouter from '../routes/api/articles.js'
import apiCategoriesRouter from '../routes/api/categories.js'
import apiSettingsRouter from '../routes/api/settings.js'
import apiUsersRouter from '../routes/api/users.js'
import apiCoursesRouter from '../routes/api/courses.js'

const router = express.Router()

router.use('/', indexRouter)
router.use('/users', usersRouter)
router.use('/api/articles', apiArticlesRouter)
router.use('/api/categories', apiCategoriesRouter)
router.use('/api/settings', apiSettingsRouter)
router.use('/api/users', apiUsersRouter)
router.use('/api/courses', apiCoursesRouter)

export default router
