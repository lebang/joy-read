import express from 'express'
import db from '../models/index.js'
import { success } from '../utils/responses.js'
import validateCaptcha from '../middlewares/validate-captcha.js'
import { delKey } from '../utils/redis.js'

const { User } = db
const router = express.Router()

/**
 * 注册
 */

router.post('/', validateCaptcha, async (req, res) => {
  const { email, username, nickname = 'hello', password, gender = 2, role = 0 } = req.body
  const user = await User.create({ email, username, nickname, password, gender, role })
  delete user.dataValues.password
  await delKey(req.body.captchaKey)
  success(res, 'success', { user }, 201)
})

export default router
