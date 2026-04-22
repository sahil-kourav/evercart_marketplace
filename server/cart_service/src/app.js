const express = require("express")
const cookieParser = require("cookie-parser")
const cartRoutes = require("./routes/cart.routes")
const app = express()
const cors = require('cors')

// Middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors(
    {
        origin: ['https://evercart-marketplace.vercel.app', 'http://localhost:3000'],
        credentials: true,
    }
));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Cart Service is running.' });
});

// Sample Route
app.use('/api/cart', cartRoutes)

module.exports = app