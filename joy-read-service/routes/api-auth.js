import express from 'express'
import { Op } from 'sequelize'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import db from '../models/index.js'
import { success } from '../utils/responses.js'
import processEnv from '../utils/process-env.js'

const router = express.Router()
const { User } = db
const { NotFound, BadRequest, Unauthorized } = createHttpError

/**
 * 登陆
 * POST
 */

router.post('/sign_in', async (req, res) => {
  const { login, password } = req.body

  if (!login) {
    throw new BadRequest('邮箱/用户名必须填写。')
  }

  if (!password) {
    throw new BadRequest('密码必须填写。')
  }
  const condition = {
    where: {
      [Op.or]: [{ email: login }, { username: login }],
    },
  }
  const user = await User.findOne(condition)
  if (!user) throw new NotFound('not found')
  const passwordVaid = bcrypt.compareSync(password, user.password)
  if (!passwordVaid) throw new Unauthorized('password error')
  if (user.role !== 100) throw new Unauthorized('role error')

  const token = jwt.sign(
    {
      userId: user.id,
    },
    processEnv.SECRET,
    { expiresIn: '7d' },
  )
  success(res, 'success', { token })
})

export default router
