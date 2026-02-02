const express = require('express');
const paymentController = require('../controller/payment.controller');
const createAuthMiddleware = require('../middlewares/auth.middleware');
const { router } = require('../app');
const route = express.Router();

route.post('/create/:orderId', createAuthMiddleware(['user']), paymentController.createPayment);
route.post('/verify', createAuthMiddleware(['user']), paymentController.verifyPayment);
module.exports = route;