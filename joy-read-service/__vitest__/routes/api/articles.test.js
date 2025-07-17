import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'
import { Op } from 'sequelize'
import app from '../../../app.js'
import getPagination from '../../../utils/pagination.js'

// --- Mocks (Vitest) ---
vi.mock('../../../middlewares/admin-auth.js', () => ({
  default: (req, res, next) => {
    req.user = { id: 1, username: 'testuser' }
    next()
  },
}))

vi.mock('../../../models/index.js', () => {
  const mockDb = {
    Article: {
      findAndCountAll: vi.fn(),
      findByPk: vi.fn(),
      create: vi.fn(),
      destroy: vi.fn(),
      restore: vi.fn(),
    },
    User: {},
  }
  return { default: mockDb }
})

vi.mock('../../../utils/pagination.js')

// We no longer mock http-errors, so we use the real one.

describe('Articles API (Vitest)', () => {
  let mockArticle
  let db

  beforeEach(async () => {
    db = (await import('../../../models/index.js')).default
    vi.clearAllMocks()

    mockArticle = {
      id: 1,
      title: 'Test Article',
      content: 'Test Content',
      userId: 1,
      update: vi.fn().mockReturnThis(),
      destroy: vi.fn().mockResolvedValue(this),
    }

    getPagination.mockReturnValue({
      currentPage: 1,
      pageSize: 10,
      offset: 0,
    })
  })

  describe('GET /api/articles', () => {
    it('should return a list of articles', async () => {
      const articles = [{ ...mockArticle }]
      db.Article.findAndCountAll.mockResolvedValue({ rows: articles, count: 1 })

      const res = await request(app).get('/api/articles')

      expect(res.status).toBe(200)
      expect(res.body.data.rows[0].title).toBe('Test Article')
      expect(db.Article.findAndCountAll).toHaveBeenCalled()
    })

    it('should filter articles by title', async () => {
      db.Article.findAndCountAll.mockResolvedValue({ rows: [], count: 0 })

      await request(app).get('/api/articles?title=Test')

      expect(db.Article.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ title: { [Op.like]: `%Test%` } }),
        }),
      )
    })

    it('should fetch soft-deleted articles when deleted=true', async () => {
      db.Article.findAndCountAll.mockResolvedValue({ rows: [], count: 0 })

      await request(app).get('/api/articles?deleted=true')

      expect(db.Article.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          paranoid: false,
          where: { deletedAt: { [Op.not]: null } },
        }),
      )
    })
  })

  describe('GET /api/articles/:id', () => {
    it('should return a single article if found', async () => {
      db.Article.findByPk.mockResolvedValue(mockArticle)

      const res = await request(app).get('/api/articles/1')

      expect(res.status).toBe(200)
      expect(res.body.data.article.title).toBe('Test Article')
      expect(db.Article.findByPk).toHaveBeenCalledWith('1')
    })

    it('should return 404 if article not found', async () => {
      db.Article.findByPk.mockResolvedValue(null)

      const res = await request(app).get('/api/articles/999')

      expect(res.status).toBe(404)
      expect(res.body.message).toBe('请求失败: NotFoundError')
      expect(res.body.errors[0]).toBe('ID:999未找到')
    })
  })

  describe('POST /api/articles', () => {
    it('should create a new article', async () => {
      const newArticleData = { title: 'New Article', content: 'New Content' }
      const createdArticle = { ...newArticleData, id: 2, userId: 1 }
      db.Article.create.mockResolvedValue(createdArticle)

      const res = await request(app).post('/api/articles').send(newArticleData)

      expect(res.status).toBe(201)
      expect(db.Article.create).toHaveBeenCalledWith({ ...newArticleData, userId: 1 })
      expect(res.body.data.article.title).toBe('New Article')
    })
  })

  describe('PUT /api/articles/:id', () => {
    it('should update an existing article', async () => {
      const updatedData = { title: 'Updated Title', content: 'Updated Content' }
      db.Article.findByPk.mockResolvedValue(mockArticle)

      const res = await request(app).put('/api/articles/1').send(updatedData)

      expect(res.status).toBe(200)
      expect(db.Article.findByPk).toHaveBeenCalledWith('1')
      expect(mockArticle.update).toHaveBeenCalledWith({ ...updatedData, userId: 1 })
    })

    it('should return 404 if article to update is not found', async () => {
      db.Article.findByPk.mockResolvedValue(null)

      const res = await request(app).put('/api/articles/999').send({ title: 'Non-existent' })

      expect(res.status).toBe(404)
    })
  })

  describe('DELETE /api/articles/:id', () => {
    it('should soft delete an article', async () => {
      db.Article.findByPk.mockResolvedValue(mockArticle)

      const res = await request(app).delete('/api/articles/1')

      expect(res.status).toBe(200)
      expect(db.Article.findByPk).toHaveBeenCalledWith('1')
      expect(mockArticle.destroy).toHaveBeenCalled()
    })

    it('should return 404 if article to delete is not found', async () => {
      db.Article.findByPk.mockResolvedValue(null)

      const res = await request(app).delete('/api/articles/999')

      expect(res.status).toBe(404)
    })
  })

  describe('POST /api/articles/delete', () => {
    it('should batch soft delete articles', async () => {
      db.Article.destroy.mockResolvedValue(2)

      const res = await request(app).post('/api/articles/delete').send({ id: [1, 2] })

      expect(res.status).toBe(200)
      expect(db.Article.destroy).toHaveBeenCalledWith({ where: { id: [1, 2] } })
    })
  })

  describe('POST /api/articles/force_delete', () => {
    it('should batch force delete articles', async () => {
      db.Article.destroy.mockResolvedValue(2)

      const res = await request(app).post('/api/articles/force_delete').send({ id: [1, 2] })

      expect(res.status).toBe(200)
      expect(db.Article.destroy).toHaveBeenCalledWith({ where: { id: [1, 2] }, force: true })
    })
  })

  describe('POST /api/articles/restore', () => {
    it('should batch restore articles', async () => {
      db.Article.restore.mockResolvedValue(2)

      const res = await request(app).post('/api/articles/restore').send({ id: [1, 2] })

      expect(res.status).toBe(200)
      expect(db.Article.restore).toHaveBeenCalledWith({ where: { id: [1, 2] } })
    })
  })
})
