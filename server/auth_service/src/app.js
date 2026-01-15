const express = require("express");
const cokieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const app = express();
const cors = require("cors");

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cokieParser());

app.use("/api/auth", authRoutes);

module.exports = app;
