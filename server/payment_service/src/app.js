const express = require('express');
const cookieParser = require('cookie-parser');
const paymentRoutes = require('./routes/payment.route');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
}));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Payment Service is running.' });
});

app.use('/api/payments', paymentRoutes);

module.exports = app;
