require('dotenv').config()
const express = require("express")
const cookieParser = require("cookie-parser")
const connectDB = require("./database/db")
const cartRoutes = require("./routes/cart.routes")
const app = express()

// Connect to Database
connectDB()

// Middleware
app.use(express.json())
app.use(cookieParser())

// Sample Route
app.use('/api/cart', cartRoutes)

module.exports = app