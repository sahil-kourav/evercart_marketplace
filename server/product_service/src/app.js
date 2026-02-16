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
        origin: 'http://localhost:3000',
        credentials: true,
    }
));

// Routes setup
app.use("/api/products", productRoutes);

module.exports = app;
