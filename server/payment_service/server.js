require('dotenv').config();
const server = require('./src/app');
const connectDB = require('./src/database/db');
const { connect } = require('./src/broker/broker');

connectDB();
connect();

const port = process.env.PORT || 3004;

server.listen(port, () => {
  console.log(`Payment service is running on port ${port}`);
});