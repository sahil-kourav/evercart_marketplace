const express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../db/redis");

async function registerUser(req, res) {
  const {
    email,
    password,
    phone,
    fullName: { firstName, lastName },
    role
  } = req.body;

  const userAlredyExists = await userModel.findOne({
    $or: [{ email }, { phone }],
  });

  if (userAlredyExists) {
    return res.status(409).json({
      message: "User with given email or phone already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hash,
    phone,
    fullName: { firstName, lastName },
    role: role || 'user',
  });

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
      addresses: user.addresses,
    },
  });
}

async function loginUser(req, res) {
  const { phone, email, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [{ email }, { phone }],
    })
    .select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid credential" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credential" });
  }
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
      addresses: user.addresses,
    },
  });
}

async function getCurrentUser(req, res) {
  return res.status(200).json({
    message: "Current user fetched successfully",
    user: req.user,
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (token) {
    // token blacklist and store in redis with expiry on 2 days
    await redis.set(`blacklist_${token}`, "true", "EX", 2 * 24 * 60 * 60);
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({ message: "Logged out successfully" });
}

async function getUserAddresses(req, res) {
  const userId = req.user.userId;

  const user = await userModel.findById(userId).select("addresses");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ addresses: user.addresses });
}

async function addUserAddress(req, res) {
  const userId = req.user.userId;
  const { street, city, state, zip, country, isDefault } = req.body;

  const user = await userModel.findOneAndUpdate(
    { _id: userId },
    {
      $push: {
        addresses: {
          street,
          city,
          state,
          zip,
          country,
          isDefault: !!isDefault,
        },
      },
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(201).json({
    message: "Address added successfully",
    address: user.addresses[user.addresses.length - 1],
   });
}

async function deleteUserAddress(req, res) {
  const userId = req.user.userId;
  const { addressId } = req.params;

  const isAddressExist = await userModel.findOne({
    _id: userId,
    "addresses._id": addressId,
  });

  if (!isAddressExist) {
    return res.status(404).json({ message: "Address not found" });
  }

  const user = await userModel.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        addresses: { _id: addressId },
      },
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const addressExists = user.addresses.some(
    (address) => address._id.toString() === addressId
  );

  if (addressExists) {
    return res.status(404).json({ message: "Address not found" });
  }
  return res
    .status(200)
    .json({
      message: "Address removed successfully",
      addresses: user.addresses,
    });
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
};
