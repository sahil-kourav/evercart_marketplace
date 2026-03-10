const express = require('express');
const cookieParser = require('cookie-parser');
// const sellerRoutes = require('./routes/seller.routes');

const app = express();


app.use(express.json());
app.use(cookieParser());



module.exports = app;
