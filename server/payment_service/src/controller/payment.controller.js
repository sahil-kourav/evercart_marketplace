const paymentModel = require('../models/payment.model');
const axios = require('axios');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const { publishToQueue } = require('../broker/broker');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function placeOrderRazorpay(req, res) {
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
        const order = await razorpay.orders.create({
            amount: price.amount * 100,
            currency: price.currency,
            receipt: orderId
        });


        const payment = await paymentModel.create({
            order: orderId,
            razorpayOrderId: order.id,
            receipt: `rcpt_${orderId}_${Date.now()}`,
            user: req.user.id,
            status: 'PENDING',
            paymentMethod: 'RAZORPAY',
            price: {
                amount: order.amount,
                currency: order.currency,
            },
        });

        await publishToQueue('PAYMENT_SELLER_DASHBOARD.PAYMENT_CREATED', payment);
        await publishToQueue('PAYMENT_NOTIFICATION.PAYMENT_INITIATED', {
            email: req.user.email,
            orderId: order.id,
            paymentId: payment._id,
            amount: payment.price.amount / 100,
            currency: payment.price.currency,
        });

        res.status(201).json({ message: 'Payment initiated successfully', payment });

    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function placeOrderCOD(req, res) {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    try {
        const orderId = req.params.orderId;

        const orderResponse = await axios.get('http://localhost:8083/api/orders/' + orderId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const price = orderResponse.data.order.totalPrice;

        const payment = await paymentModel.create({
            order: orderId,
            receipt: `rcpt_${orderId}_${Date.now()}`,
            user: req.user.id,
            status: 'PENDING',
            paymentMethod: 'COD',
            price: {
                amount: price.amount,
                currency: price.currency,
            },
        });

        await publishToQueue('PAYMENT_SELLER_DASHBOARD.PAYMENT_CREATED', payment);
        await publishToQueue('PAYMENT_NOTIFICATION.COD_ORDER_PLACED', {
            email: req.user.email,
            orderId: orderId,
            amount: payment.price.amount,
            currency: payment.price.currency,
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
        // ✅ Generate expected signature
        const body = razorpayOrderId + "|" + paymentId;

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        const payment = await paymentModel.findOne({
            razorpayOrderId,
            status: "PENDING",
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        payment.paymentId = paymentId;
        payment.signature = signature;
        payment.status = "COMPLETED";

        await payment.save();

        await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED", {
            email: req.user.email,
            orderId: payment.order,
            paymentId: payment.paymentId,
            amount: payment.price.amount / 100,
            currency: payment.price.currency,
        });

        await publishToQueue(
            "PAYMENT_SELLER_DASHBOARD.PAYMENT_UPDATE",
            payment
        );

        return res
            .status(200)
            .json({ message: "Payment verified successfully", payment });

    } catch (error) {
        console.error("Error verifying payment:", error);

        await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED", {
            email: req.user.email,
            paymentId: paymentId,
            orderId: razorpayOrderId,
        });

        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updatePaymentStatus(req, res) {
    const { paymentId, status } = req.body;

    try {
        const payment = await paymentModel.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.status = status;
        await payment.save();

        await publishToQueue('PAYMENT_SELLER_DASHBOARD.PAYMENT_STATUS_UPDATE', payment);
        await publishToQueue('ORDER_NOTIFICATION.ORDER_STATUS_DELIVERED', {
            email: req.user.email,
            orderId: payment.order,
            delivered: status === 'COMPLETED',
            fullName: {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
            },
        });

        res.status(200).json({ message: 'Payment status updated successfully', payment });

    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    placeOrderRazorpay,
    placeOrderCOD,
    verifyPayment,
    updatePaymentStatus,
}