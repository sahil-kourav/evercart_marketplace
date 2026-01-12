const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user.model');

describe('Auth Register', () => {
  afterEach(async () => {
    await User.deleteMany();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test1234',
        username: 'testuser',
        phone: '1234567890',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('should not register with existing email', async () => {
    await User.create({
      email: 'test@example.com',
      password: 'Test1234',
      username: 'testuser',
      phone: '1234567890',
      fullName: { firstName: 'Test', lastName: 'User' }
    });
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test1234',
        username: 'testuser',
        phone: '1234567890',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(400);
  });
});
