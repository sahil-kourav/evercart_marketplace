const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many auth requests. Try again later.",
});

const meLimiter = rateLimit({ 
  windowMs: 60 * 1000, 
  max: 60, 
  message: "Too many requests to /api/auth/me. Try again later."
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many payment requests. Try again later.",
});

const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: "Too many order requests. Try again later.",
});

module.exports = {
  authLimiter,
  paymentLimiter,
  orderLimiter,
  meLimiter
};