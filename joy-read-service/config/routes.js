import express from 'express'
import indexRouter from '../routes/index.js'
import usersRouter from '../routes/users.js'
import authRouter from '../routes/auth.js'
import loginAuth from '../middlewares/login-auth.js'

import apiArticlesRouter from '../routes/api/articles.js'
import apiCategoriesRouter from '../routes/api/categories.js'
import apiSettingsRouter from '../routes/api/settings.js'
import apiUsersRouter from '../routes/api/users.js'
import apiCoursesRouter from '../routes/api/courses.js'
import apiChaptersRouter from '../routes/api/chapters.js'

const router = express.Router()

router.use('/', indexRouter)
router.use('/users', usersRouter)
router.use('/api/auth', authRouter)
router.use('/api/articles', loginAuth, apiArticlesRouter)
router.use('/api/categories', loginAuth, apiCategoriesRouter)
router.use('/api/settings', apiSettingsRouter)
router.use('/api/users', loginAuth, apiUsersRouter)
router.use('/api/courses', loginAuth, apiCoursesRouter)
router.use('/api/chapters', loginAuth, apiChaptersRouter)

export default router
