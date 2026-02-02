require('dotenv').config();
const server = require('../payment_service/src/app');
const connectDB = require('../payment_service/src/database/db');

const PORT = process.env.PORT || 3004;

// Connect to the database
connectDB();

server.listen(PORT, () => {
  console.log(`Payment service is running on port ${PORT}`);
});