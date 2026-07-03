const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middleware/auth");
const setupProxy = require("./routes/proxyRoutes");
const { authLimiter, paymentLimiter, orderLimiter, meLimiter } = require("./middleware/rateLimiter");
const app = express();

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

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "API Gateway",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

// Auth middleware (header read only - must be before proxy)
app.use(authMiddleware);

// Inject headers
app.use((req, res, next) => {
  if (req.user) {
    req.headers["x-user-id"] = req.user.id;
    req.headers["x-user-role"] = req.user.role;
  }
  next();
});

app.use("/api/auth/me", meLimiter);     
app.use("/api/auth", authLimiter);    
app.use("/api/payments", paymentLimiter);
app.use("/api/orders", orderLimiter);

// Proxy setup (must be before body parsers)
setupProxy(app);

// Body parsers (AFTER proxy only)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;