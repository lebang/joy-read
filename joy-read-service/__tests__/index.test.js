import request from 'supertest';
import app from '../app'; // 导入你的 Express app

describe('GET /web', () => {
  it('should return 200 OK and response with Hello World!', async () => {
    const response = await request(app).get('/web');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});