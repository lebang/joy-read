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
 * 注册
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

  const token = jwt.sign(
    {
      userId: user.id,
    },
    processEnv.SECRET,
    { expriesIn: '7d' },
  )

  success(res, 'success', { token }, 201)
})

export default router
