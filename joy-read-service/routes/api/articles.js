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
 * 查询文章 by id
 */
const getArticle = async (req) => {
  const { id } = req?.params
  const article = await Article.findByPk(id)
  if (!article) {
    throw new NotFound(`ID:${id}未找到`)
  }

  return article
}

/**
 * 过滤参数
 * @param req
 * @returns {{title, content: (string|string|DocumentFragment|*)}}
 */
const filterBody = async (req) => {
  const { title, content } = req?.body || {}
  return {
    title,
    content,
  }
}

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

  const { rows, count: total } = await Article.findAndCountAll(condition)

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
 * 查询文章详情
 * GET /api/articles/:id
 */
router.get('/:id', async (req, res) => {
  const article = await getArticle(req)
  success(res, '查询成功', { article })
})

/**
 * 创建文章
 */
router.post('/', async (req, res) => {
  const body = filterBody(req)

  const article = await Article.create(body)
  success(res, '创建成功', { article }, 201)
})

/**
 * update
 */
router.put('/:id', async (req, res) => {
  const article = await getArticle(req)
  const body = filterBody(req)

  await article.update(body)
  success(res, '更新成功', { article })
})

/**
 * delete
 */
router.delete('/:id', async (req, res) => {
  const article = await getArticle(req)
  await article.destory()
  success(res, '删除成功', { article })
})

export default router
