const express = require("express")
const cookieParser = require("cookie-parser")
const cartRoutes = require("./routes/cart.routes")
const app = express()
const cors = require('cors')

// Middleware
app.use(express.json())
app.use(cookieParser())

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
    service: "Cart Service",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

// Sample Route
app.use('/', cartRoutes)

module.exports = app