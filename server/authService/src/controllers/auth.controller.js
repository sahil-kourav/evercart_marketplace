const userModel = require("../models/user.model");
const express = require("express");

async function registerUser(req, res) {
  const {
    username,
    email,
    password,
    phone,
    fullName: { firstName, lastName },
  } = req.body;
}
