const express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const {
    username,
    email,
    password,
    phone,
    fullName: { firstName, lastName },
  } = req.body;

  const userAlredyExists = await userModel.findOne({
    $or: [{ email }, { username }, { phone }],
  });

  if (userAlredyExists) {
    return res.status(400).json({
      message: "User with given email, username or phone already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    phone,
    fullName: { firstName, lastName },
  });

  const token = jwt.sign({
    userId: user._id,
    username: user.username,
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
  })

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        role: user.role,
        addresses: user.addresses,
    },
});
}

module.exports = {
  registerUser,
};
