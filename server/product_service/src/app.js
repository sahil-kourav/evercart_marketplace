const express = require("express");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/product.routes");
const cors = require("cors");
const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
        origin: ['http://localhost:3000', 'https://evercart-delta.vercel.app'],
        credentials: true,
    }
));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Product Service is running.' });
});

// Routes setup
app.use("/api/products", productRoutes);

module.exports = app;
