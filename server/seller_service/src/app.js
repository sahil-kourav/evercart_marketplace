const express = require('express');
const cookieParser = require('cookie-parser');
const sellerRoutes = require('./routes/seller.routes');
const cors = require('cors');
const app = express();


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
    service: "Seller Dashboard Service",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/seller/dashboard', sellerRoutes);

module.exports = app;
