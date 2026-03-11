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

// GET /api/orders/:id
route.get(
  "/:id",
  createAuthMiddleware(["user", "seller"]),
  orderController.getOrderById,
); // this will return the order details of the order with the given id, if the logged in user is a buyer then it will check if the order belongs to the user and if the logged in user is a seller then it will check if the order belongs to any of the products of the seller
module.exports = route;
