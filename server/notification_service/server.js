require('dotenv').config();
const server = require('./src/app');

const port = process.env.PORT || 3006;

server.listen(port, () => {
    console.log(`Notification Service is running on port ${port}`);
});