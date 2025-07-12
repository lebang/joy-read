import express from 'express'
import createHttpError from 'http-errors'
import db from '../../models/index.js'
import { success } from '../../utils/responses.js'

const { Course, Like, User } = db
const { NotFound, BadRequest } = createHttpError
const router = express.Router()

/**
 * 点赞， 取消
 * POST /likes
 */
router.get('/', async (req, res) => {
  const userId = req.userId
  const { courseId } = req.body

  const course = await Course.findByPk(courseId)
  if (!course) {
    throw new NotFoundError('课程不存在。')
  }

  const like = await Like.findOne({
    where: {
      courseId,
      userId,
    },
  })

  // 如果没有点赞过，那就新增。并且课程的 likesCount + 1
  if (!like) {
    await Like.create({ courseId, userId })
    await course.increment('likesCount')
    success(res, '点赞成功。')
  } else {
    // 如果点赞过了，那就删除。并且课程的 likesCount - 1
    await like.destroy()
    await course.decrement('likesCount')
    success(res, '取消赞成功。')
  }
})

export default router
