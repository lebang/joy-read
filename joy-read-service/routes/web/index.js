import express from 'express'
import db from '../../models/index.js'
import { success } from '../../utils/responses.js'

const { Course, Category, User } = db
const router = express.Router()

router.get('/', async (req, res) => {
  // 推荐课程
  const recommendedCourses = await Course.findAll({
    attributes: { exclude: ['categoryId', 'userId', 'content'] },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'nickname', 'avatar', 'company'],
      },
    ],
    where: { recommended: true },
    order: [['id', 'desc']],
    limit: 10,
  })

  // 人气课程
  const likesCourses = await Course.findAll({
    attributes: { exclude: ['categoryId', 'userId', 'content'] },
    order: [
      ['likesCount', 'desc'],
      ['id', 'desc'],
    ],
    limit: 10,
  })

  success(res, '获取首页数据成功。', {
    recommendedCourses,
    likesCourses,
  })
})

export default router
