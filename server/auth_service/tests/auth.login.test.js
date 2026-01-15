const request = require('supertest');
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../src/app');
const connectDB = require('../src/db/database');
const userModel = require('../src/models/user.model');

describe('POST /api/auth/login', () => {

  // Clean users after each test
  afterEach(async () => {
    await userModel.deleteMany({});
  });

  // Close DB after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should login a user with valid credentials', async () => {
    const user = {
      email: 'testuser@example.com',
      password: 'Password123!',
      phone: '1234567890',
      fullName: { firstName: 'Test', lastName: 'User' }
    };

    // Register user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(user);

    expect(registerRes.statusCode).toBe(201);

    // Login user
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', user.email);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong@example.com',
        phone: '1234567890',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  });
});
