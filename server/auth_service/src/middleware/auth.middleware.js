const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = decoded;

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// async function adminMiddleware(req, res, next) {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Insufficient permissions" });
//   }

//   next();
// }

module.exports = {
  authMiddleware,
};
