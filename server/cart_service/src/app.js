const express = require("express")
const cookieParser = require("cookie-parser")
const cartRoutes = require("./routes/cart.routes")
const app = express()


// Middleware
app.use(express.json())
app.use(cookieParser())

// Sample Route
app.use('/api/cart', cartRoutes)

module.exports = app