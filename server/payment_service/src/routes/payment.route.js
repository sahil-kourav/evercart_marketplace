const express = require('express');
const paymentController = require('../controller/payment.controller');
const createAuthMiddleware = require('../middlewares/auth.middleware');
const route = express.Router();

// POST /api/payments/create/:orderId
route.post('/razorpay/:orderId', createAuthMiddleware(['user']), paymentController.placeOrderRazorpay);

// POST /api/payments/cod/:orderId
route.post('/cod/:orderId', createAuthMiddleware(['user']), paymentController.placeOrderCOD);

// POST /api/payments/verify 
route.post('/verify', createAuthMiddleware(['user']), paymentController.verifyPayment);

// PUT /api/payments/update-status
route.put('/update-status', createAuthMiddleware(['seller']), paymentController.updatePaymentStatus);
module.exports = route;