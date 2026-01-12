const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../src/app");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("POST /auth/register creates a new user and hashes password", async () => {
  const payload = {
    username: "testuser",
    email: "test@example.com",
    password: "Password123!",
    fullName: { firstName: "Test", lastName: "User" },
  };

  const res = await request(app).post("/auth/register").send(payload);
  expect(res.statusCode).toBe(201);
  expect(res.body.user).toBeDefined();
  expect(res.body.user.email).toBe(payload.email);

  // password should not be present in response
  expect(res.body.user.password).toBeUndefined();

  const User = require("../src/models/user.model");
  const found = await User.findOne({ email: payload.email });
  expect(found).toBeTruthy();
  expect(found.password).not.toBe(payload.password);
});

test('POST /auth/register returns 400 when required fields are missing', async () => {
  const payload = {
    username: 'incomplete',
    // email missing
    password: 'pass',
    fullName: { firstName: 'No', lastName: 'Email' }
  }

  const res = await request(app).post('/auth/register').send(payload)
  expect(res.statusCode).toBe(400)
  expect(res.body).toHaveProperty('message', 'Missing required fields')
})

test('POST /auth/register returns 409 when user already exists (email or username)', async () => {
  const payload = {
    username: 'dupuser',
    email: 'dup@example.com',
    password: 'Password!23',
    fullName: { firstName: 'Dup', lastName: 'User' }
  }

  const res1 = await request(app).post('/auth/register').send(payload)
  expect(res1.statusCode).toBe(201)

  const res2 = await request(app).post('/auth/register').send(payload)
  expect(res2.statusCode).toBe(409)
  expect(res2.body).toHaveProperty('message', 'User already exists')
})
