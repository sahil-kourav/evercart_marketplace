const express = require("express");
const authRoutes = require("./routes/auth.route");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

// Middleware

app.use(cors(
    {
        origin: 'https://evercart-marketplace.vercel.app',
        credentials: true,
    }
));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Auth service is running"
    });
})

app.use('/api/auth', authRoutes);



module.exports = app;