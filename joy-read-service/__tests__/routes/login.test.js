import { jest } from '@jest/globals'
import request from 'supertest'

// Mock modules before they are imported
jest.unstable_mockModule('../../models/index.js', () => ({
  default: {
    User: {
      findOne: jest.fn(),
    },
  },
}))

jest.unstable_mockModule('bcryptjs', () => ({
  default: {
    compareSync: jest.fn(),
  },
}))

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn(),
  },
}))

// Dynamically import modules after mocks are defined
const { default: app } = await import('../../app.js')
const { default: db } = await import('../../models/index.js')
const { default: bcrypt } = await import('bcryptjs')
const { default: jwt } = await import('jsonwebtoken')

const { User } = db

describe('POST /api/login', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should login successfully and return a token', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
      dataValues: { id: 1, password: 'hashedpassword' },
      toJSON: () => ({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
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
    expect(User.findOne).toHaveBeenCalledWith({
      where: {
        [Symbol.for('or')]: [{ email: 'testuser' }, { username: 'testuser' }],
      },
    })
    expect(bcrypt.compareSync).toHaveBeenCalledWith('password123', 'hashedpassword')
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, expect.any(String), { expiresIn: '7d' })
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
