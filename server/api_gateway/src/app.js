const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");
const setupProxy = require("./routes/proxyRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://evercart-steel.vercel.app",
  ],
  credentials: true,
}));

app.use(morgan("dev"));

// auth
app.use(authMiddleware);

// inject headers
app.use((req, res, next) => {
  if (req.user) {
    req.headers["x-user-id"] = req.user.id;
    req.headers["x-user-role"] = req.user.role;
  }
  next();
});

setupProxy(app);
app.use(rateLimiter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Gateway is running.' });
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });

  next();
});

module.exports = app;