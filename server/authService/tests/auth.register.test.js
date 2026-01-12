const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user.model');

describe('Auth Register', () => {
  afterEach(async () => {
    await User.deleteMany();
  });

  it('should create a user and return 201 with user (no password)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
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
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should reject duplicate username/email with 409', async () => {
    await User.create({
      email: 'test@example.com',
      password: 'Test1234',
      username: 'testuser',
      phone: '1234567890',
      fullName: { firstName: 'Test', lastName: 'User' }
    });
    // Duplicate email
    let res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test1234',
        username: 'anotheruser',
        phone: '0987654321',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(409);
    // Duplicate username
    res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'another@example.com',
        password: 'Test1234',
        username: 'testuser',
        phone: '0987654322',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(409);
  });

  it('should validate missing fields with 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
