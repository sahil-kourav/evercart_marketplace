require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const { connect } = require('./src/broker/broker');


connectDB();
connect();


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}...`)
})
