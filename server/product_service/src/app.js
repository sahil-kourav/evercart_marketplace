const express = require('express');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/product.routes');


const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Routes setup
app.use('/api/products', productRoutes);

module.exports = app;