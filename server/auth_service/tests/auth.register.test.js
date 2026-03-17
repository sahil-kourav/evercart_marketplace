const request = require('supertest');
require('dotenv').config(); 
const mongoose = require('mongoose');
const app = require('../src/app');
const connectDB = require('../src/db/db');
const userModel = require('../src/models/user.model');

describe('Auth Register', () => {

  // Clean DB after each test
  afterEach(async () => {
    await userModel.deleteMany({});
  });

  // Close DB after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a user and return 201 with user (no password)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test1234',
        phone: '1234567890',
        fullName: { firstName: 'Test', lastName: 'User' }
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe('test@example.com');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should reject duplicate email or phone with 409', async () => {
  // Seed an existing user
  await userModel.create({
    email: 'test@example.com',
    password: 'Test1234', // hashing not required here
    phone: '1234567890',
    fullName: { firstName: 'Test', lastName: 'User' }
  });

  // ❌ Duplicate EMAIL
  let res = await request(app)
    .post('/api/auth/register')
    .send({
      email: 'test@example.com', // duplicate email
      password: 'Test12345',
      phone: '9999999999',
      fullName: { firstName: 'New', lastName: 'User' }
    });

  expect(res.statusCode).toBe(409);
  expect(res.body.message).toMatch(/email/i);

  // ❌ Duplicate PHONE
  res = await request(app)
    .post('/api/auth/register')
    .send({
      email: 'new@example.com',
      password: 'Test12345',
      phone: '1234567890', // duplicate phone
      fullName: { firstName: 'Another', lastName: 'User' }
    });

  expect(res.statusCode).toBe(409);
  expect(res.body.message).toMatch(/phone/i);
});


  it('should validate missing fields with 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });
});
