const express = require("express");
const authRoutes = require("./routes/auth.route");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

// Middleware for CORS
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
    service: "Auth Service",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

app.use('/', authRoutes);

module.exports = app;