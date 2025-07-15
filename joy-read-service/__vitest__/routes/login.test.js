import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest'
import request from 'supertest'

// Mocking dependencies with Vitest. These are hoisted.
vi.mock('../../models/index.js')
vi.mock('bcryptjs')
vi.mock('jsonwebtoken')

describe('POST /api/login (Vitest)', () => {
  let app
  let User
  let bcrypt
  let jwt

  // Before all tests, dynamically import the modules
  beforeAll(async () => {
    const appModule = await import('../../app.js')
    app = appModule.default

    const dbModule = await import('../../models/index.js')
    User = dbModule.default.User

    const bcryptModule = await import('bcryptjs')
    bcrypt = bcryptModule.default

    const jwtModule = await import('jsonwebtoken')
    jwt = jwtModule.default
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should login successfully and return a token', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
      toJSON: () => ({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      }),
    }
    User.findOne.mockResolvedValue(mockUser)
    bcrypt.compareSync.mockReturnValue(true)
    jwt.sign.mockReturnValue('fake-jwt-token')

    const response = await request(app)
      .post('/api/login')
      .send({ login: 'testuser', password: 'password123' })

    expect(response.status).toBe(201)
    expect(response.body.code).toBe(201)
    expect(response.body.message).toBe('success')
    expect(response.body.data).toHaveProperty('token', 'fake-jwt-token')
    expect(response.body.data).toHaveProperty('user')
    expect(response.body.data.user).not.toHaveProperty('password')
  })

  it('should return 404 if user not found', async () => {
    User.findOne.mockResolvedValue(null)

    const response = await request(app)
      .post('/api/login')
      .send({ login: 'nonexistent', password: 'password123' })

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('请求失败: NotFoundError')
    expect(response.body.errors[0]).toBe('not found user')
  })

  it('should return 401 if password is wrong', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'hashedpassword',
    }
    User.findOne.mockResolvedValue(mockUser)
    bcrypt.compareSync.mockReturnValue(false)

    const response = await request(app)
      .post('/api/login')
      .send({ login: 'testuser', password: 'wrongpassword' })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('请求失败: UnauthorizedError')
    expect(response.body.errors[0]).toBe('error password')
  })

  it('should return 400 if login is not provided', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ password: 'password123' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('请求失败: BadRequestError')
    expect(response.body.errors[0]).toBe('username or email')
  })

  it('should return 400 if password is not provided', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ login: 'testuser' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('请求失败: BadRequestError')
    expect(response.body.errors[0]).toBe('password')
  })
})