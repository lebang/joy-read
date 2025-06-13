import express from 'express'
import db from '../models/index.js'
import { success } from '../utils/responses.js'

const { User } = db
const router = express.Router()

/**
 * 注册
 */

router.post('/', async (req, res) => {
  const { email, username, nickname = 'hello', password, gender = 2, role = 0 } = req.body
  const user = await User.create({ email, username, nickname, password, gender, role })
  delete user.dataValues.password

  success(res, 'success', { user }, 201)
})

export default router
