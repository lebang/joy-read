import express from 'express'
import { Op, where } from 'sequelize'
import createHttpError from 'http-errors'
import db from '../../models/index.js'
import getPagination from '../../utils/pagination.js'
import { success } from '../../utils/responses.js'

const router = express.Router()
const { Course, Category, User, Chapter } = db
const { NotFound, BadRequest } = createHttpError

/**
 * 公共方法：关联分类、用户数据
 * @returns {{include: [{as: string, model, attributes: string[]}], attributes: {exclude: string[]}}}
 */
const getCondition = () => {
  return {
    attributes: { exclude: ['CategoryId', 'UserId'] },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'avatar'],
      },
    ],
  }
}

/**
 * 查询 by id
 */
const getCourse = async (req) => {
  const { id } = req?.params || ''

  const condition = getCondition()

  const course = await Course.findByPk(id, condition)
  if (!course) {
    throw new NotFound(`ID:${id}未找到`)
  }
  return course
}

/**
 * 过滤参数
 * @param req
 * @returns
 */
const filterBody = (req) => {
  const body = req?.body || {}
  const allowedFields = [
    'categoryId',
    'name',
    'image',
    'gender',
    'introductory',
    'content',
  ]
  return Object.fromEntries(Object.entries(body).filter(([key]) => allowedFields.includes(key)))
}

/**
 * 查询列表
 * GET /api/courses
 */
router.get('/', async (req, res) => {
  const { currentPage, pageSize, offset } = getPagination(req)
  const { query } = req

  const condition = {
    ...getCondition(),
    where: {},
    order: [['id', 'DESC']],
    limit: pageSize,
    offset,
  }

  if (query.categoryId) {
    condition.where = {
      categoryId: {
        [Op.eq]: query.categoryId,
      },
    }
  }

  if (query.userId) {
    condition.where = {
      userId: {
        [Op.eq]: query.userId,
      },
    }
  }

  if (query.name) {
    condition.where = {
      name: {
        [Op.like]: `%${query.name}%`,
      },
    }
  }

  if (query.recommended) {
    condition.where = {
      recommended: {
        // 需要转布尔值
        [Op.eq]: query.recommended === 'true',
      },
    }
  }

  if (query.introductory) {
    condition.where = {
      introductory: {
        [Op.eq]: query.introductory === 'true',
      },
    }
  }

  const { rows, count: total } = await Course.findAndCountAll(condition)

  const message = '查询列表成功。'

  success(res, message, {
    rows,
    pagination: {
      total,
      currentPage,
      pageSize,
    },
  })
})

/**
 * 查询详情
 * GET /api/courses/:id
 */
router.get('/:id', async (req, res) => {
  const course = await getCourse(req)
  success(res, '查询成功', { course })
})

/**
 * create
 */
router.post('/', async (req, res) => {
  const body = filterBody(req)
  body.userId = req.user.id

  const course = await Course.create(body)
  success(res, '创建成功', { course }, 201)
})

/**
 * update
 */
router.put('/:id', async (req, res) => {
  const body = filterBody(req)
  const course = await getCourse(req)

  await course.update(body)
  success(res, '更新成功', { course })
})

/**
 * delete
 */
router.delete('/:id', async (req, res) => {
  const course = await getCourse(req)
  const count = await Chapter.count({ where: { courseId: req.params.id } })
  if (count > 0) throw new BadRequest('当前课程有章节，无法删除')
  await course.destroy()
  success(res, '删除成功', { course })
})

export default router
