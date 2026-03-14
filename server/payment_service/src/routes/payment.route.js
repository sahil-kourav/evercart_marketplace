const express = require('express');
const paymentController = require('../controller/payment.controller');
const createAuthMiddleware = require('../middlewares/auth.middleware');
const { router } = require('../app');
const route = express.Router();

// POST /api/payments/create/:orderId // this will create a new payment for the order with the given id, the payment status will be set to "pending" and the payment will be associated with the logged in user, only the buyer who created the order can create the payment
route.post('/razorpay/:orderId', createAuthMiddleware(['user']), paymentController.placeOrderRazorpay);

route.post('/cod/:orderId', createAuthMiddleware(['user']), paymentController.placeOrderCOD);

// POST /api/payments/verify // this will verify the payment for the order with the given id, the payment status will be set to "completed" if the payment is successful and the order status will be set to "paid", only the buyer who created the order can verify the payment    
route.post('/verify', createAuthMiddleware(['user']), paymentController.verifyPayment);

route.put('/update-status', createAuthMiddleware(['seller']), paymentController.updatePaymentStatus);
module.exports = route;