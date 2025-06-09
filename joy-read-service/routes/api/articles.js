import express from 'express'
import { Op, where } from 'sequelize'
import createHttpError from 'http-errors'
import db from '../../models/index.js'
import getPagination from '../../utils/pagination.js'
import { success } from '../../utils/responses.js'

const router = express.Router()
const { Article } = db
const { NotFound } = createHttpError

/**
 * 查询文章列表
 * GET /api/articles
 */
router.get('/', async (req, res) => {
  const { currentPage, pageSize, offset } = getPagination(req)
  const { title } = req.query
  const condition = {
    where: {},
    order: [['id', 'DESC']],
    limit: pageSize,
    offset,
  }

  if (title) {
    condition.where.title = {
      [Op.like]: `%${title}`,
    }
  }

  const { rows, count } = await Article.findAndCountAll(condition)

  success(res, 'success', {
    rows,
    pagination: {
      count,
      currentPage,
      pageSize,
    },
  })
})

export default router
