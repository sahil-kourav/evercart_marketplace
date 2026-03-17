const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../db/redis");
const { publishToQueue } = require("../broker/broker");

async function registerUser(req, res) {
try {
  const {
    email,
    password,
    phone,
    fullName: { firstName, lastName },
    role,
  } = req.body;

  const emailExists = await userModel.findOne({ email });
  if (emailExists) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const phoneExists = await userModel.findOne({ phone });
  if (phoneExists) {
    return res.status(409).json({ message: "Phone already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hash,
    phone,
    fullName: { firstName, lastName },
    role: role || "user",
  });


  
  // publish user registration event to RabbitMQ 
  await Promise.all([
    publishToQueue("AUTH_NOTIFICATION.USER_REGISTERED", {
      id: user._id,
      email: user.email,
      phone: user.phone,
    fullName: {
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
      },
      role: user.role,
    }),
    publishToQueue("AUTH_SELLER_DASHBOARD.USER_REGISTERED", user)
  ])

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
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
} catch (error) {
  console.error("Error registering user:", error);
  res.status(500).json({ message: "Internal server error" });
}
}

async function loginUser(req, res) {
  try {
  const { phone, email, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [{ email }, { phone }],
    })
    .select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
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
} catch (error) {
  console.error("Error logging in user:", error);
  res.status(500).json({ message: "Internal server error" });
}
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
      // blacklist token (JWT expiry ke barabar ya thoda kam)
      await redis.set(
        `blacklist_${token}`,
        "true",
        "EX",
        2 * 24 * 60 * 60
      );
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: 'true',
    });
    

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
}


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate admin credentials (stored securely in environment variables)
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        {
          email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
      );
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



async function getUserAddresses(req, res) {
  const id = req.user.id;

  const user = await userModel.findById(id).select("addresses");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    message: "User addresses fetched successfully",
    addresses: user.addresses,
  });
}

async function addUserAddress(req, res) {
  const id = req.user.id;

  const { name, email, phone, street, city, state, pincode, country, isDefault } = req.body;

  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        addresses: {
          name,
          email,
          phone,
          street,
          city,
          state,
          pincode,
          country,
          isDefault,
        },
      },
    },
    { new: true },
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
  const id = req.user.id;
  const { addressId } = req.params;

  const isAddressExists = await userModel.findOne({
    _id: id,
    "addresses._id": addressId,
  });

  if (!isAddressExists) {
    return res.status(404).json({ message: "Address not found" });
  }

  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        addresses: { _id: addressId },
      },
    },
    { new: true },
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const addressExists = user.addresses.some(
    (addr) => addr._id.toString() === addressId,
  );
  if (addressExists) {
    return res.status(500).json({ message: "Failed to delete address" });
  }

  return res.status(200).json({
    message: "Address deleted successfully",
    addresses: user.addresses,
  });
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  adminLogin,
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
};