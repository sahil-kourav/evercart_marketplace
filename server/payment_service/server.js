const server = require('./src/app');

const PORT = process.env.PORT || 3004;

server.listen(PORT, () => {
  console.log(`Payment service is running on port ${PORT}`);
});