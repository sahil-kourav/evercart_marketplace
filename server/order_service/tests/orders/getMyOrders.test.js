const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

const app = require('../../src/app');
const orderModel = require('../../src/models/order.model');

const createAuthToken = (overrides = {}) => {
  return jwt.sign(
    {
      id: overrides.userId || new mongoose.Types.ObjectId().toHexString(),
      role: overrides.role || 'user',
    },
    process.env.JWT_SECRET || 'testsecret'
  );
};

describe('GET /api/orders/me — List user orders', () => {
  let mongo;
  let userId;
  let token;

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

  beforeEach(async () => {
    userId = new mongoose.Types.ObjectId().toHexString();
    token = createAuthToken({ userId });
    await orderModel.deleteMany({});
  });

  it('returns empty array if user has no orders', async () => {
    const res = await request(app)
      .get('/api/orders/me')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(res.body.orders)).toBe(true);
    expect(res.body.orders.length).toBe(0);
  });

  it('returns all orders for the authenticated user', async () => {
    // Insert two orders for this user
    await orderModel.create([
      {
        user: userId,
        items: [
          {
            productId: new mongoose.Types.ObjectId(),
            quantity: 1,
            price: { amount: 100, currency: 'INR' },
          },
        ],
        status: 'PENDING',
        totalPrice: { amount: 100, currency: 'INR' },
        shippingAddress: {
          street: '123 Main St',
          city: 'Metropolis',
          state: 'CA',
          zip: '90210',
          country: 'IN',
          phone: '1234567890',
        },
      },
      {
        user: userId,
        items: [
          {
            productId: new mongoose.Types.ObjectId(),
            quantity: 2,
            price: { amount: 200, currency: 'INR' },
          },
        ],
        status: 'CONFIRMED',
        totalPrice: { amount: 400, currency: 'INR' },
        shippingAddress: {
          street: '456 Side St',
          city: 'Gotham',
          state: 'NY',
          zip: '10001',
          country: 'IN',
          phone: '9876543210',
        },
      },
    ]);

    const res = await request(app)
      .get('/api/orders/me')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body.orders)).toBe(true);
    expect(res.body.orders.length).toBe(2);
    for (const order of res.body.orders) {
      expect(order.user).toBe(userId);
    }
  });

  it('does not return orders of other users', async () => {
    // Insert an order for another user
    await orderModel.create({
      user: new mongoose.Types.ObjectId().toHexString(),
      items: [
        {
          productId: new mongoose.Types.ObjectId(),
          quantity: 1,
          price: { amount: 100, currency: 'INR' },
        },
      ],
      status: 'PENDING',
      totalPrice: { amount: 100, currency: 'INR' },
      shippingAddress: {
        street: '789 Other St',
        city: 'Star City',
        state: 'WA',
        zip: '98001',
        country: 'IN',
        phone: '5555555555',
      },
    });

    const res = await request(app)
      .get('/api/orders/me')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body.orders)).toBe(true);
    expect(res.body.orders.length).toBe(0);
  });

  it('returns 401 if not authenticated', async () => {
    const res = await request(app)
      .get('/api/orders/me')
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.message || res.body.error).toBeDefined();
  });
});
