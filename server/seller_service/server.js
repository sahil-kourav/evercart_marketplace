require('dotenv').config();
const server = require('./src/app');

const port = process.env.PORT || 3007;

server.listen(port, () => {
    console.log(`Seller service is running on port ${port}`);
});