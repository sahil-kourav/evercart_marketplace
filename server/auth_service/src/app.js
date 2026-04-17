const express = require("express");
const authRoutes = require("./routes/auth.route");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

// Middleware

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://evercart-delta.vercel.app",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Auth service is running"
    });
})

app.use('/api/auth', authRoutes);



module.exports = app;