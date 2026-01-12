const express = require('express')
const cokieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cokieParser())

module.exports = app