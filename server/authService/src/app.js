const express = require('express')
const cokieParser = require('cookie-parser')

const app = express()


app.use(express.json())
app.use(cokieParser())

// auth routes
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)


module.exports = app