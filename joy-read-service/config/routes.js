import express from 'express'
import indexRouter from '../routes/web/index.js'
import apiAuthRouter from '../routes/api-auth.js'
import registerRouter from '../routes/register.js'
import captchaRouter from '../routes/captcha.js'
import adminAuth from '../middlewares/admin-auth.js'
import webAuth from '../middlewares/web-auth.js'

import likesRouter from '../routes/web/likes.js'

import apiloginRouter from '../routes/login.js'
import apiArticlesRouter from '../routes/api/articles.js'
import apiCategoriesRouter from '../routes/api/categories.js'
import apiSettingsRouter from '../routes/api/settings.js'
import apiUsersRouter from '../routes/api/users.js'
import apiCoursesRouter from '../routes/api/courses.js'
import apiChaptersRouter from '../routes/api/chapters.js'

import webRouter from '../routes/index.js'

const router = express.Router()

router.use('/web', webRouter)
router.use('/web/likes', webAuth, likesRouter)

router.use('/api/index', indexRouter)
router.use('/api/register', registerRouter)
router.use('/api/captcha', captchaRouter)
router.use('/api/login', apiloginRouter)
router.use('/api/auth', apiAuthRouter)
router.use('/api/articles', adminAuth, apiArticlesRouter)
router.use('/api/categories', adminAuth, apiCategoriesRouter)
router.use('/api/settings', apiSettingsRouter)
router.use('/api/users', adminAuth, apiUsersRouter)
router.use('/api/courses', adminAuth, apiCoursesRouter)
router.use('/api/chapters', adminAuth, apiChaptersRouter)

export default router
