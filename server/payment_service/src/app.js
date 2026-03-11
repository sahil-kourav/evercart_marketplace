const express = require('express');
const cookieParser = require('cookie-parser');
const paymentRoutes = require('./routes/payment.route');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Payment Service is running.' });
});

app.use('/api/payments', paymentRoutes);

module.exports = app;
