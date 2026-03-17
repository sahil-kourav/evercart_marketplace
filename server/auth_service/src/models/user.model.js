const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    select: false,
  },

  role: {
    type: String,
    enum: ["user", "seller"],
    default: "user",
  },

  addresses: [addressSchema],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
