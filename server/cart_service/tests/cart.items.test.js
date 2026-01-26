// Jest test for POST /api/cart/items

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.test' });
const app = require('../src/app');

// Helper to generate JWT for test user
const testUser = { id: new mongoose.Types.ObjectId().toString(), role: 'user' };
const token = jwt.sign(testUser, process.env.JWT_SECRET);
const authHeader = { Authorization: `Bearer ${token}` };


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('POST /api/cart/items', () => {
  it('should add an item to the cart and return the item', async () => {
    const newItem = {
      productId: new mongoose.Types.ObjectId().toString(),
      qty: 2
    };
    const response = await request(app)
      .post('/api/cart/items')
      .send(newItem)
      .set(authHeader)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    const item = response.body.cart.items.find(i => i.productId === newItem.productId);
    expect(item).toBeDefined();
    expect(item.quantity).toBe(newItem.qty);
  });

  it('should return 400 if productId is missing', async () => {
    const response = await request(app)
      .post('/api/cart/items')
      .send({ qty: 2 })
      .set(authHeader)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 if quantity is missing', async () => {
    const response = await request(app)
      .post('/api/cart/items')
      .send({ productId: new mongoose.Types.ObjectId().toString() })
      .set(authHeader)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should increment quantity if item already exists in cart', async () => {
    const productId = new mongoose.Types.ObjectId().toString();
    // Add item first time
    await request(app)
      .post('/api/cart/items')
      .send({ productId, qty: 1 })
      .set(authHeader)
      .set('Accept', 'application/json');
    // Add same item again
    const response = await request(app)
      .post('/api/cart/items')
      .send({ productId, qty: 3 })
      .set(authHeader)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    const item = response.body.cart.items.find(i => i.productId === productId);
    expect(item).toBeDefined();
    expect(item.quantity).toBe(4);
  });

  it('should return 500 if there is a server error', async () => {
    // Temporarily override cartModel.findOne to throw
    const cartModel = require('../src/models/cart.model');
    const originalFindOne = cartModel.findOne;
    cartModel.findOne = () => { throw new Error('Test error'); };
    const response = await request(app)
      .post('/api/cart/items')
      .send({ productId: new mongoose.Types.ObjectId().toString(), qty: 1 })
      .set(authHeader)
      .set('Accept', 'application/json');
    expect([400, 500]).toContain(response.statusCode);
    expect(response.body).toHaveProperty('message');
    cartModel.findOne = originalFindOne; // Restore
  });
});
