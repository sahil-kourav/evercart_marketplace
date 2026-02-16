require('dotenv').config()
const server = require('../cart_service/src/app')
const connectDB = require('../cart_service/src/database/db')

// Connect to Database
connectDB()

const port = process.env.PORT || 3002;

server.listen(port, () => {
    console.log(`Cart Service is running on port ${port}`);
})