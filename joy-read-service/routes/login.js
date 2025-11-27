import express from 'express'
import { Op } from 'sequelize'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import db from '../models/index.js'
import { success } from '../utils/responses.js'
import processEnv from '../utils/process-env.js'

const { User } = db
const { BadRequest, NotFound, Unauthorized } = createHttpError
const router = express.Router()

/**
 * 登录
 */
router.post('/', async (req, res) => {
  const { login, password } = req.body
  if (!login) throw new BadRequest('username or email')
  if (!password) throw new BadRequest('password')
  const condition = {
    where: {
      [Op.or]: [{ email: login }, { username: login }],
    },
  }
  const user = await User.findOne(condition)
  if (!user) throw new NotFound('not found user')

  const passwordValid = bcrypt.compareSync(password, user.password)
  if (!passwordValid) throw new Unauthorized('error password')
  const userJson = user.toJSON()
  delete userJson.password

  const userId = user.id
  const token = jwt.sign(
    {
      userId,
    },
    processEnv.JWT_SECRET,
    { expiresIn: '7d' },
  )

  // res.set('token', token)
  success(res, 'success', { token, user: userJson }, 201)
})

export default router
