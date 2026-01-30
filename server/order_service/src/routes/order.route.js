const express = require("express");
const orderController = require("../controller/order.controller");
const createAuthMiddleware = require("../middlewares/auth.middleware");
const validation = require("../middlewares/validation.middleware");
const route = express.Router();

route.post(
  "/",
  createAuthMiddleware(["user"]),
  validation.orderValidation,
  orderController.createOrder,
);

route.get("/me", createAuthMiddleware(["user"]), orderController.getMyOrders);

route.post(
  "/:id/cancel",
  createAuthMiddleware(["user"]),
  orderController.cancelOrder,
);

route.get(
  "/:id",
  createAuthMiddleware(["user", "admin"]),
  orderController.getOrderById,
);
module.exports = route;
