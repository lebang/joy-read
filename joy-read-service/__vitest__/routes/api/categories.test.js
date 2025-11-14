
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Op } from 'sequelize'
import createHttpError from 'http-errors'
import router from '../../../routes/api/categories.js'

// Mock 依赖项
vi.mock('../../../models/index.js', () => {
  const mockCategory = {
    findAndCountAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
  }
  const mockCourse = {
    count: vi.fn(),
  }
  return {
    default: {
      Category: mockCategory,
      Course: mockCourse,
      sequelize: {
        transaction: vi.fn(),
      },
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

// 动态导入被 mock 的模块
const db = await import('../../../models/index.js')
const { success } = await import('../../../utils/responses.js')
const { default: getPagination } = await import('../../../utils/pagination.js')

const { Category, Course } = db.default

// 从 router 中提取路由处理函数
const getRouteHandler = (method, path) => {
  const layer = router.stack.find(
    (l) => l.route.path === path && l.route.methods[method],
  )
  if (!layer) {
    throw new Error(`Handler for ${method.toUpperCase()} ${path} not found`)
  }
  return layer.route.stack[0].handle
}

const listHandler = getRouteHandler('get', '/')
const getHandler = getRouteHandler('get', '/:id')
const createHandler = getRouteHandler('post', '/')
const updateHandler = getRouteHandler('put', '/:id')
const deleteHandler = getRouteHandler('delete', '/:id')

describe('API Routes - categories.js', () => {
  let mockReq, mockRes

  beforeEach(() => {
    vi.resetAllMocks()
    mockReq = {
      params: {},
      query: {},
      body: {},
    }
    mockRes = {} // `success` function is mocked, so res doesn't need methods
  })

  describe('GET /api/categories', () => {
    it('should get a list of categories successfully', async () => {
      const mockCategories = [{ id: 1, name: 'Category 1' }]
      Category.findAndCountAll.mockResolvedValue({
        rows: mockCategories,
        count: 1,
      })

      await listHandler(mockReq, mockRes)

      expect(Category.findAndCountAll).toHaveBeenCalledWith({
        where: {},
        order: [['id', 'DESC']],
        limit: 10,
        offset: 0,
      })
      expect(success).toHaveBeenCalledWith(
        mockRes,
        '查询文章列表成功。',
        expect.objectContaining({
          rows: mockCategories,
          pagination: { total: 1, currentPage: 1, pageSize: 10 },
        }),
      )
    })

    it('should filter categories by name', async () => {
      mockReq.query.name = 'Test'
      Category.findAndCountAll.mockResolvedValue({ rows: [], count: 0 })

      await listHandler(mockReq, mockRes)

      expect(Category.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            name: {
              [Op.like]: '%Test',
            },
          },
        }),
      )
    })
  })

  describe('GET /api/categories/:id', () => {
    it('should get a single category by id', async () => {
      const mockCategory = { id: 1, name: 'Test Category' }
      mockReq.params.id = '1'
      Category.findByPk.mockResolvedValue(mockCategory)

      await getHandler(mockReq, mockRes)

      expect(Category.findByPk).toHaveBeenCalledWith('1', expect.any(Object))
      expect(success).toHaveBeenCalledWith(mockRes, '查询成功', {
        category: mockCategory,
      })
    })

    it('should throw NotFound error if category does not exist', async () => {
      mockReq.params.id = '999'
      Category.findByPk.mockResolvedValue(null)

      await expect(getHandler(mockReq, mockRes)).rejects.toThrow(
        createHttpError.NotFound,
      )
      await expect(getHandler(mockReq, mockRes)).rejects.toThrow('ID:999未找到')
    })
  })

  describe('POST /api/categories', () => {
    it('should create a new category', async () => {
      const newCategoryData = { name: 'New Category', rank: 1 }
      const createdCategory = { id: 2, ...newCategoryData }
      mockReq.body = newCategoryData
      Category.create.mockResolvedValue(createdCategory)

      await createHandler(mockReq, mockRes)

      expect(Category.create).toHaveBeenCalledWith(newCategoryData)
      expect(success).toHaveBeenCalledWith(
        mockRes,
        '创建成功',
        { category: createdCategory },
        201,
      )
    })
  })

  describe('PUT /api/categories/:id', () => {
    it('should update an existing category', async () => {
      const updateData = { name: 'Updated Name' }
      const mockCategoryInstance = {
        id: 1,
        name: 'Old Name',
        update: vi.fn(),
      }
      mockReq.params.id = '1'
      mockReq.body = updateData
      Category.findByPk.mockResolvedValue(mockCategoryInstance)

      await updateHandler(mockReq, mockRes)

      expect(Category.findByPk).toHaveBeenCalledWith('1', expect.any(Object))
      expect(mockCategoryInstance.update).toHaveBeenCalledWith(updateData)
      expect(success).toHaveBeenCalledWith(mockRes, '更新成功', {
        category: mockCategoryInstance,
      })
    })

    it('should throw NotFound error if category to update does not exist', async () => {
      mockReq.params.id = '999'
      mockReq.body = { name: 'Does not matter' }
      Category.findByPk.mockResolvedValue(null)

      await expect(updateHandler(mockReq, mockRes)).rejects.toThrow(
        createHttpError.NotFound,
      )
    })
  })

  describe('DELETE /api/categories/:id', () => {
    it('should delete a category if it has no associated courses', async () => {
      const mockCategoryInstance = {
        id: 1,
        name: 'To be deleted',
        destroy: vi.fn(),
      }
      mockReq.params.id = '1'
      Category.findByPk.mockResolvedValue(mockCategoryInstance)
      Course.count.mockResolvedValue(0)

      await deleteHandler(mockReq, mockRes)

      expect(Category.findByPk).toHaveBeenCalledWith('1', expect.any(Object))
      expect(Course.count).toHaveBeenCalledWith({ where: { categoryId: '1' } })
      expect(mockCategoryInstance.destroy).toHaveBeenCalled()
      expect(success).toHaveBeenCalledWith(mockRes, '删除成功', {
        category: mockCategoryInstance,
      })
    })

    it('should throw BadRequest error if category has associated courses', async () => {
      const mockCategoryInstance = { id: 1, name: 'Cannot delete' }
      mockReq.params.id = '1'
      Category.findByPk.mockResolvedValue(mockCategoryInstance)
      Course.count.mockResolvedValue(5) // Has 5 courses

      await expect(deleteHandler(mockReq, mockRes)).rejects.toThrow(
        createHttpError.BadRequest,
      )
      await expect(deleteHandler(mockReq, mockRes)).rejects.toThrow(
        '当前分类有课程，无法删除',
      )
      expect(success).not.toHaveBeenCalled()
    })

    it('should throw NotFound error if category to delete does not exist', async () => {
      mockReq.params.id = '999'
      Category.findByPk.mockResolvedValue(null)

      await expect(deleteHandler(mockReq, mockRes)).rejects.toThrow(
        createHttpError.NotFound,
      )
    })
  })
})
