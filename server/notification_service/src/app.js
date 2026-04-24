const express = require('express');
const { connect } = require('./broker/broker');
const setListners = require('./broker/listners')
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://evercart-steel.vercel.app"
    ],
    credentials: true,
  })
);

connect().then(() => {
    setListners()
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Notification Service is running.' });
});



module.exports = app;