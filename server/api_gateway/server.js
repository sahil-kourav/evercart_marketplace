require('dotenv').config();
const server = require('./src/app');

const port = process.env.PORT || 3008;

server.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});