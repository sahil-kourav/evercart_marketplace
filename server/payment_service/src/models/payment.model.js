const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    receipt: {
      type: String,
      required: true,
      unique: true,
    },

    paymentId: {
        type: String,
    },

    razorpayOrderId: {
        type: String,
    },

    signature: {
        type: String,
    },

    paymentMethod: {
        type: String,
        enum: ['RAZORPAY', 'COD'],
        default: 'COD',
    },

    price: {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            enum: ['INR', 'USD'],
            default: 'INR',
        },
    },

    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING',
    },

}, { timestamps: true });

const paymentModel = mongoose.model('payment', paymentSchema);

module.exports = paymentModel;