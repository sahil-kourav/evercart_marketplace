require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const paymentRoutes = require('./routes/payment.route');
const { connect } = require('./broker/broker');
const connectDB = require('./database/db');
const app = express();

// Connect to RabbitMQ
connect();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/payments', paymentRoutes);

module.exports = app;