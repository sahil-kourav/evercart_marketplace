const express = require('express');
const { connect } = require('./broker/broker');
const setListners = require('./broker/listners')

const app = express();

connect().then(() => {
    setListners()
})

app.get('/', (req, res) => {
    res.send("Notification Service is up and running")
})



module.exports = app;