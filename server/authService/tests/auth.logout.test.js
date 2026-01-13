const request = require('supertest');
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../src/app');
const userModel = require('../src/models/user.model');
const bcrypt = require('bcryptjs');

describe('GET /api/auth/logout', () => {

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('clears the auth cookie and returns 200 when logged in', async () => {
    const password = 'Secret123!';
    const hash = await bcrypt.hash(password, 10);

    await userModel.create({
      username: 'logout_user',
      email: 'logout@example.com',
      phone: '0987654321',
      password: hash,
      fullName: { firstName: 'Log', lastName: 'Out' },
    });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'logout@example.com', password });

    expect(loginRes.status).toBe(200);

    const cookies = loginRes.headers['set-cookie'];

    const res = await request(app)
      .get('/api/auth/logout')
      .set('Cookie', cookies);

    expect(res.status).toBe(200);

    const cookieStr = (res.headers['set-cookie'] || []).join(';');
    expect(cookieStr).toMatch(/token=;/);
    expect(cookieStr.toLowerCase()).toMatch(/expires=/);
  });

  it('is idempotent: returns 200 even without auth cookie', async () => {
    const res = await request(app).get('/api/auth/logout');
    expect(res.status).toBe(200);
  });
});
