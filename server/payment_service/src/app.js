const express = require('express');
const cookieParser = require('cookie-parser');
const paymentRoutes = require('./routes/payment.route');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://evercart-steel.vercel.app"
    ],
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Payment Service",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

app.use('/', paymentRoutes);

module.exports = app;
