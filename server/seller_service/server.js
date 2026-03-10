require('dotenv').config();
const server = require('./src/app');

const connectDB = require('./src/database/db');
const listener = require('./src/broker/listener');
const { connect } = require('./src/broker/broker');

connectDB();

connect().then(() => {
    listener();
})

const port = process.env.PORT || 3007;


server.listen(port, () => {
    console.log(`Seller service is running on port ${port}`);
});
