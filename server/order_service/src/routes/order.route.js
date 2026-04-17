const express = require("express");
const orderController = require("../controller/order.controller");
const createAuthMiddleware = require("../middlewares/auth.middleware");
const validation = require("../middlewares/validation.middleware");
const route = express.Router();

route.post("/", createAuthMiddleware(["user"]), validation.orderValidation, orderController.createOrder); // Done

route.get("/me", createAuthMiddleware(["user"]), orderController.getMyOrders); // Done

route.post("/:id/cancel", createAuthMiddleware(["user"]), orderController.cancelOrder); // Done

route.get("/admin/all", createAuthMiddleware(["seller"]), orderController.getAllOrders); // Done

route.get("/:id", createAuthMiddleware(["user", "seller"]), orderController.getOrderById); // Done

route.post('/status/:id', createAuthMiddleware(['seller']), orderController.updateOrderStatus); // Done
module.exports = route;
