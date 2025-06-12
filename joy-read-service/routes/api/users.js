import express from 'express'
import { Op, where } from 'sequelize'
import createHttpError from 'http-errors'
import db from '../../models/index.js'
import getPagination from '../../utils/pagination.js'
import { success } from '../../utils/responses.js'

const router = express.Router()
const { User } = db
const { NotFound } = createHttpError

/**
 * 查询 by id
 */
const getUser = async (req) => {
  const { id } = req?.params
  const user = await User.findByPk(id)
  if (!user) {
    throw new NotFound(`ID:${id}未找到`)
  }
  return user
}

/**
 * 过滤参数
 * @param req
 * @returns
 */
const filterBody = (req) => {
  const body = req?.body || {}
  const allowedFields = [
    'email',
    'username',
    'password',
    'nickname',
    'gender',
    'company',
    'introduce',
    'role',
    'avatar',
  ]
  return Object.fromEntries(Object.entries(body).filter(([key]) => allowedFields.includes(key)))
}

/**
 * 查询列表
 * GET /api/users
 */
router.get('/', async (req, res) => {
  const { currentPage, pageSize, offset } = getPagination(req)
  const condition = {
    where: {},
    order: [['id', 'DESC']],
    limit: pageSize,
    offset,
  }

  const validFields = ['email', 'username', 'role']
  const whereConditions = {}
  const { query } = req

  validFields.forEach((field) => {
    if (query[field]) {
      whereConditions[field] = query[field]
    }
  })

  if (query.nickname) {
    whereConditions.nickname = {
      [Op.like]: `%${query.nickname}%`,
    }
  }

  condition.where = whereConditions

  const { rows, count: total } = await User.findAndCountAll(condition)

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
 * GET /api/users/:id
 */
router.get('/:id', async (req, res) => {
  const user = await getUser(req)
  success(res, '查询成功', { user })
})

/**
 * create
 */
router.post('/', async (req, res) => {
  const body = filterBody(req)

  const user = await User.create(body)
  success(res, '创建成功', { user }, 201)
})

/**
 * update
 */
router.put('/:id', async (req, res) => {
  const body = filterBody(req)
  const user = await getUser(req)

  await user.update(body)
  success(res, '更新成功', { user })
})

/**
 * delete
 */
router.delete('/:id', async (req, res) => {
  const user = await getUser(req)
  await user.destroy()
  success(res, '删除成功', { user })
})

export default router
