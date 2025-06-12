import express from 'express'
import { Op, where } from 'sequelize'
import createHttpError from 'http-errors'
import db from '../../models/index.js'
import getPagination from '../../utils/pagination.js'
import { success } from '../../utils/responses.js'

const router = express.Router()
const { Category, Course } = db
const { NotFound, BadRequest } = createHttpError

/**
 * 查询文章 by id
 */
const getCategory = async (req) => {
  const { id } = req?.params
  const condition = {
    include: [
      {
        model: Course,
        as: 'courses',
      },
    ],
  }
  const category = await Category.findByPk(id, condition)
  if (!category) {
    throw new NotFound(`ID:${id}未找到`)
  }

  return category
}

/**
 * 过滤参数
 * @param req
 * @returns {{name, rank: (string|string|DocumentFragment|*)}}
 */
const filterBody = (req) => {
  const { name, rank } = req?.body || {}
  return {
    name,
    rank,
  }
}

/**
 * 查询列表
 * GET /api/categories
 */
router.get('/', async (req, res) => {
  const { currentPage, pageSize, offset } = getPagination(req)
  const { name } = req.query
  const condition = {
    where: {},
    order: [['id', 'DESC']],
    limit: pageSize,
    offset,
  }

  if (name) {
    condition.where.name = {
      [Op.like]: `%${name}`,
    }
  }

  const { rows, count: total } = await Category.findAndCountAll(condition)

  const message = '查询文章列表成功。'

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
 * GET /api/categories/:id
 */
router.get('/:id', async (req, res) => {
  const category = await getCategory(req)
  success(res, '查询成功', { category })
})

/**
 * 创建
 */
router.post('/', async (req, res) => {
  const body = filterBody(req)

  const category = await Category.create(body)
  success(res, '创建成功', { category }, 201)
})

/**
 * update
 */
router.put('/:id', async (req, res) => {
  const body = filterBody(req)
  const category = await getCategory(req)

  await category.update(body)
  success(res, '更新成功', { category })
})

/**
 * delete
 */
router.delete('/:id', async (req, res) => {
  const category = await getCategory(req)
  const count = await Course.count({ where: { categoryId: req.params.id } })

  if (count > 0) throw new BadRequest('当前分类有课程，无法删除')
  await category.destroy()
  success(res, '删除成功', { category })
})

export default router
