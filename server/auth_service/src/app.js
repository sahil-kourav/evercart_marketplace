const express = require("express");
const connectDB = require('./db/database')
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const { connect } = require("./broker/broker");
const app = express();
const cors = require("cors");

connectDB()
connect()

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.192:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

module.exports = app;
