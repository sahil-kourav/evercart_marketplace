const path = require("path");
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../src/app");

/**
 * 🔹 Mock ImageKit (NO real API call)
 */
jest.mock("../src/services/imagekit.service", () => ({
  uploadImage: jest.fn(async () => ({
    url: "https://ik.mock/test.jpg",
    thumbnail: "https://ik.mock/thumb/test.jpg",
    id: "file_test",
  })),
}));

describe("POST /api/products", () => {
  let mongo;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    process.env.MONGO_URI = uri;
    process.env.JWT_SECRET = "testsecret";

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    jest.clearAllMocks();
  });

  /**
   * ✅ SUCCESS CASE
   */
  it("creates a product with images", async () => {
    const token = jwt.sign(
      { id: new mongoose.Types.ObjectId().toHexString(), role: "seller" },
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Test Product")
      .field("description", "Nice product")
      .field("priceAmount", "99.99")
      .field("priceCurrency", "INR")
      .field("category", "Electronics")
      .attach("images", path.join(__dirname, "fixtures", "sample.jpg"));

    expect(res.status).toBe(201);
    expect(res.body?.data?.title).toBe("Test Product");
    expect(res.body?.data?.price?.amount).toBe(99.99);
    expect(res.body?.data?.price?.currency).toBe("INR");
    expect(res.body?.data?.category).toBe("Electronics");
    expect(res.body?.data?.images?.length).toBe(1);
    expect(res.body?.data?.images[0]?.url).toContain("https://ik.mock/");
  });

  /**
   * ❌ VALIDATION: missing fields
   */
  it("fails when required fields are missing", async () => {
    const token = jwt.sign(
      { id: new mongoose.Types.ObjectId(), role: "seller" },
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Only title");

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Validation/i);
  });

  /**
   * ❌ VALIDATION: invalid price
   */
  it("fails when priceAmount is invalid", async () => {
    const token = jwt.sign(
      { id: new mongoose.Types.ObjectId(), role: "seller" },
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Test")
      .field("category", "Electronics")
      .field("priceAmount", "-10");

    expect(res.status).toBe(400);
  });

  /**
   * 🔐 AUTH: non-seller blocked
   */
  it("blocks user without seller role", async () => {
    const token = jwt.sign(
      { id: new mongoose.Types.ObjectId(), role: "user" },
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Test")
      .field("category", "Electronics")
      .field("priceAmount", "100");

    expect(res.status).toBe(403);
  });

  /**
   * 🔐 AUTH: missing token
   */
  it("fails when auth token is missing", async () => {
    const res = await request(app)
      .post("/api/products")
      .field("title", "Test")
      .field("category", "Electronics")
      .field("priceAmount", "100");

    expect(res.status).toBe(401);
  });
});
