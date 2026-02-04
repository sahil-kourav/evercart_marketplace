const paymentModel = require('../models/payment.model');
const axios = require('axios');
require('dotenv').config();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createPayment(req, res) {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    try {
        const orderId = req.params.orderId;

        const orderResponse = await axios.get('http://localhost:8083/api/orders/' + orderId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log('Order Response:', orderResponse.data.order.totalPrice);

        const price = orderResponse.data.order.totalPrice;
        const order = await razorpay.orders.create(price);

        // const order = await razorpay.orders.create({
        //     amount: price * 100,
        //     currency: "INR",
        //     receipt: orderId,
        // });


        const payment = await paymentModel.create({
            order: orderId,
            razorpayOrderId: orderId,
            user: req.user.id,
            status: 'PENDING',
            price: {
                amount: order.amount,
                currency: order.currency,
            },
        });

        res.status(201).json({ message: 'Payment initiated successfully', payment });

    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function verifyPayment(req, res) {
    const { razorpayOrderId, paymentId, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    try {
        const { validatePaymentVerification } = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js')
        const isValid = validatePaymentVerification({
            order_id: razorpayOrderId,
            payment_id: paymentId,
        }, signature, secret);

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid payment signature' });
        }

        const payment = await paymentModel.findOne({ razorpayOrderId, status: 'PENDING' });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.paymentId = paymentId;
        payment.signature = signature;
        payment.status = 'COMPLETED';
        await payment.save();

        res.status(200).json({ message: 'Payment verified successfully', payment });

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createPayment,
    verifyPayment,
}