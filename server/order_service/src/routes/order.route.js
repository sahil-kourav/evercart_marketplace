const express = require("express");
const orderController = require("../controller/order.controller");
const createAuthMiddleware = require("../middlewares/auth.middleware");
const validation = require("../middlewares/validation.middleware");
const route = express.Router();


// POST /api/orders // this will create a new order for the logged in user, the request body will contain the product id and the quantity of the product to be ordered, the order status will be set to "pending" and the order will be associated with the logged in user
route.post("/", createAuthMiddleware(["user"]), validation.orderValidation, orderController.createOrder);

// GET /api/orders/me // this will return all the orders of the logged in user, the orders will be sorted by the order creation date in descending order
route.get("/me", createAuthMiddleware(["user"]), orderController.getMyOrders);

// POST /api/orders/:id/cancel // this will cancel the order with the given id, the order status will be set to "cancelled" and the order will be associated with the logged in user, only the buyer who created the order can cancel the order
route.post("/:id/cancel", createAuthMiddleware(["user"]), orderController.cancelOrder);

// GET /api/orders/:id // this will return the order details of the order with the given id, if the logged in user is a buyer then it will check if the order belongs to the user and if the logged in user is a seller then it will check if the order belongs to any of the products of the seller
route.get("/:id", createAuthMiddleware(["user", "seller"]), orderController.getOrderById);

route.post('/status/:id', createAuthMiddleware(['seller']), orderController.updateOrderStatus);
module.exports = route;
