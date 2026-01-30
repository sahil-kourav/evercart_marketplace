const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

const app = require('../../src/app');
const orderModel = require('../../src/models/order.model');

/**
 * 🔐 Helper: create valid JWT for Order Service
 */
const createAuthToken = (overrides = {}) => {
  return jwt.sign(
    {
      id: overrides.userId || new mongoose.Types.ObjectId().toHexString(),
      role: overrides.role || 'user',
    },
    process.env.JWT_SECRET || 'testsecret'
  );
};

describe('POST /api/orders — Create order from current cart', () => {
  let mongo;

  const sampleAddress = {
    street: '123 Main St',
    city: 'Metropolis',
    state: 'CA',
    zip: '902101',
    country: 'USA',
    phone: '1234567890',
  };

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongo.getUri();
    process.env.JWT_SECRET = 'testsecret';

    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  });

  afterEach(async () => {
    await orderModel.deleteMany({});
  });


  /**
   * ❌ VALIDATION ERROR
   */
  
  it('returns 400 when shipping address is missing', async () => {
    const token = createAuthToken();

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.message || res.body.errors).toBeDefined();
  });
});
