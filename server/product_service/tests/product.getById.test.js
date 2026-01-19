const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Mock imagekit service to avoid importing ESM-only uuid during tests
jest.mock('../src/services/imagekit.service', () => ({
    uploadImage: jest.fn(async () => ({ url: 'https://ik.mock/x', thumbnail: 'https://ik.mock/t', id: 'file_x' })),
}));

const app = require('../src/app');
const Product = require('../src/models/product.model');

describe('GET /api/products/:id', () => {
    let mongo;

    beforeAll(async () => {
        mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();
        process.env.MONGO_URI = uri;
        await mongoose.connect(uri);
        await Product.syncIndexes();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    });

    afterEach(async () => {
        const collections = await mongoose.connection.db.collections();
        for (const c of collections) await c.deleteMany({});
    });

    const createProduct = (overrides = {}) => {
        return Product.create({
            title: overrides.title ?? 'Sample Product',
            description: overrides.description ?? 'A great product',
            price: overrides.price ?? { amount: 100, currency: 'USD' },
            category: overrides.category ?? 'Test',
            seller: overrides.seller ?? new mongoose.Types.ObjectId(),
            images: overrides.images ?? [],
        });
    };

    it('returns 404 if product does not exist', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/products/${fakeId}`);
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/not found/i);
    });

    it('returns the product if it exists', async () => {
        const product = await createProduct({ title: 'Unique Product' });
        const res = await request(app).get(`/api/products/${product._id}`);
        expect(res.status).toBe(200);
        expect(res.body.product).toBeDefined();
        expect(res.body.product.title).toBe('Unique Product');
    });
});
