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

describe('POST /api/orders/:id/cancel — Cancel order', () => {
  let mongo;
  let userId;
  let token;
  let order;

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
    order = await orderModel.create({
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
    });
  });

  it('cancels the order if status is PENDING', async () => {
    const res = await request(app)
      .post(`/api/orders/${order._id}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.order).toBeDefined();
    expect(res.body.order.status).toBe('CANCELLED');
  });

  it('cancels the order if status is CONFIRMED', async () => {
    order.status = 'CONFIRMED';
    await order.save();
    const res = await request(app)
      .post(`/api/orders/${order._id}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.order.status).toBe('CANCELLED');
  });

  it('returns 400 if order status is SHIPPED', async () => {
    order.status = 'SHIPPED';
    await order.save();
    const res = await request(app)
      .post(`/api/orders/${order._id}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.message).toMatch(/cannot cancel/i);
  });

  it('returns 404 if order does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();
    const res = await request(app)
      .post(`/api/orders/${fakeId}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  it('returns 403 if user does not own the order', async () => {
    const otherToken = createAuthToken({ userId: new mongoose.Types.ObjectId().toHexString() });
    const res = await request(app)
      .post(`/api/orders/${order._id}/cancel`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect('Content-Type', /json/)
      .expect(403);
    expect(res.body.message).toMatch(/forbidden/i);
  });

  it('returns 401 if not authenticated', async () => {
    const res = await request(app)
      .post(`/api/orders/${order._id}/cancel`)
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.message || res.body.error).toBeDefined();
  });
});
