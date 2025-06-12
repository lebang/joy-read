import express from 'express'
import { Op, where } from 'sequelize'
import createHttpError from 'http-errors'
import db from '../../models/index.js'
import getPagination from '../../utils/pagination.js'
import { success } from '../../utils/responses.js'

const router = express.Router()
const { Chapter, Course } = db
const { NotFound, BadRequest } = createHttpError

/**
 * 公共方法：关联课程数据
 * @returns {{include: [{as: string, model, attributes: string[]}], attributes: {exclude: string[]}}}
 */
const getCondition = () => {
  return {
    attributes: { exclude: ['CourseId'] },
    include: [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'name']
      }
    ]
  }
}

/**
 * 查询 by id
 */
const getChapter = async (req) => {
  const { id } = req?.params || ''

  const condition = getCondition();

  const chapter = await Chapter.findByPk(id, condition)
  if (!chapter) {
    throw new NotFound(`ID:${id}未找到`)
  }
  return chapter
}

/**
 * 过滤参数
 * @param req
 * @returns
 */
const filterBody = (req) => {
  const body = req?.body || {}
  const allowedFields = [
    'courseId',
    'title',
    'content',
    'image',
    'video',
    'rank',
  ]
  return Object.fromEntries(Object.entries(body).filter(([key]) => allowedFields.includes(key)))
}

/**
 * 查询列表
 * GET /api/chapters
 */
router.get('/', async (req, res) => {
  const { currentPage, pageSize, offset } = getPagination(req)
  const { query } = req
  if (!query.courseId) {
    throw new BadRequest('获取章节列表失败，课程ID不能为空。');
  }

  const condition = {
    ...getCondition(),
    where: {},
    order: [['rank', 'ASC'], ['id', 'ASC']],
    limit: pageSize,
    offset,
  }

  condition.where = {
    courseId: {
      [Op.eq]: query.courseId
    }
  };

  if (query.title) {
    condition.where = {
      title: {
        [Op.like]: `%${ query.title }%`
      }
    };
  }

  const { rows, count: total } = await Chapter.findAndCountAll(condition)

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
 * GET /api/chapters/:id
 */
router.get('/:id', async (req, res) => {
  const chapter = await getChapter(req)
  success(res, '查询成功', { chapter })
})

/**
 * create
 */
router.post('/', async (req, res) => {
  const body = filterBody(req)

  const chapter = await Chapter.create(body)
  success(res, '创建成功', { chapter }, 201)
})

/**
 * update
 */
router.put('/:id', async (req, res) => {
  const body = filterBody(req)
  const chapter = await getChapter(req)

  await chapter.update(body)
  success(res, '更新成功', { chapter })
})

/**
 * delete
 */
router.delete('/:id', async (req, res) => {
  const chapter = await getChapter(req)
  await chapter.destroy()
  success(res, '删除成功', { chapter })
})

export default router
