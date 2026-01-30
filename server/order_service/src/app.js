const express = require('express');
const orderRoute = require('./routes/order.route');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/orders', orderRoute);

module.exports = app;