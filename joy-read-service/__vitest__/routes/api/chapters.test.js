
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Op } from 'sequelize'
import createHttpError from 'http-errors'
import router from '../../../routes/api/chapters.js'

// 1. Mock 所有的外部依赖
vi.mock('../../../models/index.js', () => {
  const mockChapter = {
    findAndCountAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
  }
  const mockCourse = {}
  return {
    default: {
      Chapter: mockChapter,
      Course: mockCourse,
    },
  }
})

vi.mock('../../../utils/pagination.js', () => ({
  default: vi.fn(() => ({
    currentPage: 1,
    pageSize: 10,
    offset: 0,
  })),
}))

vi.mock('../../../utils/responses.js', () => ({
  success: vi.fn(),
}))

// 2. 动态导入被 mock 的模块
const db = await import('../../../models/index.js')
const { success } = await import('../../../utils/responses.js')

const { Chapter } = db.default

// 3. 从 router 中提取路由处理函数以便单独测试
const getRouteHandler = (method, path) => {
  const layer = router.stack.find(
    (l) => l.route.path === path && l.route.methods[method],
  )
  if (!layer) throw new Error(`Handler for ${method.toUpperCase()} ${path} not found`)
  return layer.route.stack[0].handle
}

const listHandler = getRouteHandler('get', '/')
const getHandler = getRouteHandler('get', '/:id')
const createHandler = getRouteHandler('post', '/')
const updateHandler = getRouteHandler('put', '/:id')
const deleteHandler = getRouteHandler('delete', '/:id')

describe('API Routes - chapters.js', () => {
  let mockReq, mockRes

  beforeEach(() => {
    vi.resetAllMocks()
    mockReq = { params: {}, query: {}, body: {} }
    mockRes = {}
  })

  describe('GET /api/chapters', () => {
    it('should throw BadRequest if courseId is not provided', async () => {
      await expect(listHandler(mockReq, mockRes)).rejects.toThrow(
        createHttpError.BadRequest,
      )
      await expect(listHandler(mockReq, mockRes)).rejects.toThrow(
        '获取章节列表失败，课程ID不能为空。',
      )
    })

    it('should get a list of chapters for a given courseId', async () => {
      mockReq.query.courseId = '1'
      const mockChapters = [{ id: 1, title: 'Chapter 1' }]
      Chapter.findAndCountAll.mockResolvedValue({ rows: mockChapters, count: 1 })

      await listHandler(mockReq, mockRes)

      expect(Chapter.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
        where: { courseId: { [Op.eq]: '1' } },
      }))
      expect(success).toHaveBeenCalledWith(mockRes, '查询列表成功。', expect.any(Object))
    })

    // 这个测试验证了之前分析中发现的逻辑BUG
    it('should overwrite courseId filter when title is provided (current buggy behavior)', async () => {
      mockReq.query.courseId = '1'
      mockReq.query.title = 'Test'
      Chapter.findAndCountAll.mockResolvedValue({ rows: [], count: 0 })

      await listHandler(mockReq, mockRes)

      // 验证 where 条件被 title 完全覆盖，这是当前代码的实际行为
      expect(Chapter.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
        where: { title: { [Op.like]: '%Test%' } },
      }))
    })
  })

  describe('GET /api/chapters/:id', () => {
    it('should get a single chapter by id', async () => {
      const mockChapter = { id: 1, title: 'Test Chapter' }
      mockReq.params.id = '1'
      Chapter.findByPk.mockResolvedValue(mockChapter)

      await getHandler(mockReq, mockRes)

      expect(Chapter.findByPk).toHaveBeenCalledWith('1', expect.any(Object))
      expect(success).toHaveBeenCalledWith(mockRes, '查询成功', { chapter: mockChapter })
    })

    it('should throw NotFound if chapter does not exist', async () => {
      mockReq.params.id = '999'
      Chapter.findByPk.mockResolvedValue(null)

      await expect(getHandler(mockReq, mockRes)).rejects.toThrow(createHttpError.NotFound)
    })
  })

  describe('POST /api/chapters', () => {
    it('should create a new chapter', async () => {
      const newChapterData = { courseId: 1, title: 'New Chapter' }
      const createdChapter = { id: 2, ...newChapterData }
      mockReq.body = newChapterData
      Chapter.create.mockResolvedValue(createdChapter)

      await createHandler(mockReq, mockRes)

      expect(Chapter.create).toHaveBeenCalledWith(newChapterData)
      expect(success).toHaveBeenCalledWith(mockRes, '创建成功', { chapter: createdChapter }, 201)
    })
  })

  describe('PUT /api/chapters/:id', () => {
    it('should update an existing chapter', async () => {
      const updateData = { title: 'Updated Title' }
      const mockChapterInstance = { id: 1, title: 'Old Title', update: vi.fn() }
      mockReq.params.id = '1'
      mockReq.body = updateData
      Chapter.findByPk.mockResolvedValue(mockChapterInstance)

      await updateHandler(mockReq, mockRes)

      expect(Chapter.findByPk).toHaveBeenCalledWith('1', expect.any(Object))
      expect(mockChapterInstance.update).toHaveBeenCalledWith(updateData)
      expect(success).toHaveBeenCalledWith(mockRes, '更新成功', { chapter: mockChapterInstance })
    })

    it('should throw NotFound if chapter to update does not exist', async () => {
      mockReq.params.id = '999'
      Chapter.findByPk.mockResolvedValue(null)

      await expect(updateHandler(mockReq, mockRes)).rejects.toThrow(createHttpError.NotFound)
    })
  })

  describe('DELETE /api/chapters/:id', () => {
    it('should delete a chapter', async () => {
      const mockChapterInstance = { id: 1, title: 'To Delete', destroy: vi.fn() }
      mockReq.params.id = '1'
      Chapter.findByPk.mockResolvedValue(mockChapterInstance)

      await deleteHandler(mockReq, mockRes)

      expect(Chapter.findByPk).toHaveBeenCalledWith('1', expect.any(Object))
      expect(mockChapterInstance.destroy).toHaveBeenCalled()
      expect(success).toHaveBeenCalledWith(mockRes, '删除成功', { chapter: mockChapterInstance })
    })

    it('should throw NotFound if chapter to delete does not exist', async () => {
      mockReq.params.id = '999'
      Chapter.findByPk.mockResolvedValue(null)

      await expect(deleteHandler(mockReq, mockRes)).rejects.toThrow(createHttpError.NotFound)
    })
  })
})
