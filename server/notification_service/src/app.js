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

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Notification Service",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;