import express from 'express'
import indexRouter from '../routes/index.js'
// import usersRouter from '../routes/users.js'
import apiAuthRouter from '../routes/api-auth.js'
import adminAuth from '../middlewares/admin-auth.js'

import apiArticlesRouter from '../routes/api/articles.js'
import apiCategoriesRouter from '../routes/api/categories.js'
import apiSettingsRouter from '../routes/api/settings.js'
import apiUsersRouter from '../routes/api/users.js'
import apiCoursesRouter from '../routes/api/courses.js'
import apiChaptersRouter from '../routes/api/chapters.js'

const router = express.Router()

router.use('/', indexRouter)
// router.use('/users', usersRouter)
router.use('/api/auth', apiAuthRouter)
router.use('/api/articles', adminAuth, apiArticlesRouter)
router.use('/api/categories', adminAuth, apiCategoriesRouter)
router.use('/api/settings', apiSettingsRouter)
router.use('/api/users', adminAuth, apiUsersRouter)
router.use('/api/courses', adminAuth, apiCoursesRouter)
router.use('/api/chapters', adminAuth, apiChaptersRouter)

export default router
