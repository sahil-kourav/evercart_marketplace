const request = require("supertest");
require("dotenv").config();
const mongoose = require("mongoose");

const app = require("../src/app");
const userModel = require("../src/models/user.model");
const jwt = require("jsonwebtoken");

describe("Auth User Addresses APIs", () => {
  let token;
  let user;

  /* -------------------- SETUP -------------------- */

  beforeEach(async () => {
    // Create user before each test
    user = await userModel.create({
      email: "address@test.com",
      password: "Test1234",
      username: "addressuser",
      phone: "9999999999",
      fullName: { firstName: "Test", lastName: "User" },
      addresses: [],
    });

    token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: "USER",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  });

  /* -------------------- CLEANUP -------------------- */

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /* -------------------- GET ADDRESSES -------------------- */

  it("should return empty address list for new user", async () => {
    const res = await request(app)
      .get("/api/auth/users/me/addresses")
      .set("Cookie", `token=${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("addresses");
    expect(Array.isArray(res.body.addresses)).toBe(true);
    expect(res.body.addresses.length).toBe(0);
  });

  /* -------------------- ADD ADDRESS -------------------- */

  it("should add a new address successfully", async () => {
    const res = await request(app)
      .post("/api/auth/users/me/addresses")
      .set("Cookie", `token=${token}`)
      .send({
        street: "MG Road",
        city: "Indore",
        state: "MP",
        zip: "452001",
        country: "India",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Address added successfully");

    const updatedUser = await userModel.findById(user._id);
    expect(updatedUser.addresses.length).toBe(1);
  });

  it("should return user addresses after adding address", async () => {
    user.addresses.push({
      street: "Ring Road",
      city: "Indore",
      state: "MP",
      zip: "452010",
      country: "India",
    });
    await user.save();

    const res = await request(app)
      .get("/api/auth/users/me/addresses")
      .set("Cookie", `token=${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.addresses.length).toBe(1);
    expect(res.body.addresses[0].city).toBe("Indore");
  });

  /* -------------------- DELETE ADDRESS -------------------- */

  it("should delete an address by addressId", async () => {
    user.addresses.push({
      street: "Old Road",
      city: "Bhopal",
      state: "MP",
      zip: "462001",
      country: "India",
    });
    await user.save();

    const addressId = user.addresses[0]._id;

    const res = await request(app)
      .delete(`/api/auth/users/me/addresses/${addressId}`)
      .set("Cookie", `token=${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Address removed successfully");

    const updatedUser = await userModel.findById(user._id);
    expect(updatedUser.addresses.length).toBe(0);
  });


    /* -------------------- DEFAULT ADDRESS -------------------- */

  it("should return list of addresses and indicate default address", async () => {
    // Seed multiple addresses, one marked as default
    user.addresses.push(
      {
        street: "Main Road",
        city: "Indore",
        state: "MP",
        zip: "452001",
        country: "India",
        isDefault: true,
      },
      {
        street: "Ring Road",
        city: "Bhopal",
        state: "MP",
        zip: "462001",
        country: "India",
        isDefault: false,
      }
    );

    await user.save();

    const res = await request(app)
      .get("/api/auth/users/me/addresses")
      .set("Cookie", `token=${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.addresses)).toBe(true);
    expect(res.body.addresses.length).toBe(2);

    // Check that one address is marked as default
    const defaultAddresses = res.body.addresses.filter(
      (address) => address.isDefault === true
    );

    expect(defaultAddresses.length).toBe(1);
    expect(defaultAddresses[0].city).toBe("Indore");
  });


    /* -------------------- UNAUTHORIZED -------------------- */

  it("should reject request without auth token", async () => {
    const res = await request(app).get("/api/auth/users/me/addresses");

    expect(res.statusCode).toBe(401);
  });
});
