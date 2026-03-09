const express = require('express');
const cokieParser = require('cookie-parser');
const connectDB = require('./database/db');
const { connect } = require('./broker/broker');
const listners = require('./broker/listners');
const app = express();

connectDB();
connect().then(()=>{
    listners();
})

app.use(express.json());
app.use(cokieParser());

module.exports = app;
