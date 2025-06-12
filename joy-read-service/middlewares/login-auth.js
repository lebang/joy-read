import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import db from '../models/index.js'
import { success, failure } from '../utils/responses.js'

const { User } = db
const { Unauthorized } = createHttpError

export default async (req, res, next) => {
  const { token } = req.headers
  if (!token) {
    throw new Unauthorized('当前接口需要认证才能访问。')
  }
  const decoded = jwt.verify(token, 'joy-read')
  const { userId } = decoded

  const user = await User.findByPk(userId)

  if (!user) throw new Unauthorized('用户不存在')
  if (user.role !== 100) throw new Unauthorized('用户无权限')
  req.user = user
  next()
}
