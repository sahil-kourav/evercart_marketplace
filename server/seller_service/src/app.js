const express = require('express');
const cookieParser = require('cookie-parser');
const sellerRoutes = require('./routes/seller.routes');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Update this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
}));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Seller Dashboard Service is running.' });
});

app.use('/api/seller/dashboard', sellerRoutes);

module.exports = app;
