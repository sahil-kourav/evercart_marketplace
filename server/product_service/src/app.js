const express = require("express");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/product.routes");
const cors = require("cors");
const app = express();

// Middleware setup
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
    service: "Product Service",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

// Routes setup
app.use("/", productRoutes);

module.exports = app;
