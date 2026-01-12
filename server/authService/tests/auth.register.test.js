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
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test1234',
        username: 'testuser',
        phone: '1234567890',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(400);
  });

  it('should not register with missing required fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should not register with invalid email format', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'invalid-email',
        password: 'Test1234',
        username: 'testuser2',
        phone: '1234567890',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should not register with short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'shortpass@example.com',
        password: '123',
        username: 'shortpass',
        phone: '1234567890',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });


  it('should not register with short username', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'shortuser@example.com',
        password: 'Test1234',
        username: 'ab',
        phone: '1234567890',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should not register with existing username', async () => {
    await User.create({
      email: 'uniqueemail@example.com',
      password: 'Test1234',
      username: 'uniqueuser',
      phone: '1234567890',
      fullName: { firstName: 'Test', lastName: 'User' }
    });
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'anotheremail@example.com',
        password: 'Test1234',
        username: 'uniqueuser',
        phone: '0987654321',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(400);
  });

  it('should not register with existing phone', async () => {
    await User.create({
      email: 'uniquephone@example.com',
      password: 'Test1234',
      username: 'uniquephone',
      phone: '1112223333',
      fullName: { firstName: 'Test', lastName: 'User' }
    });
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'anotherphone@example.com',
        password: 'Test1234',
        username: 'anotheruser',
        phone: '1112223333',
        fullName: { firstName: 'Test', lastName: 'User' }
      });
    expect(res.statusCode).toBe(400);
  });
});
