const express = require('express');
const orderRoute = require('./routes/order.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
        origin: ['http://localhost:3000', 'https://evercart-marketplace.vercel.app/'],
        credentials: true,
    }
));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Order Service is running.' });
});

app.use('/api/orders', orderRoute);

module.exports = app;