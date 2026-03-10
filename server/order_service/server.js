require("dotenv").config();
const server = require("./src/app");
const connectDB = require("./src/database/db");
const { connect } = require("./src/broker/broker");

connectDB();
connect();

const port = process.env.PORT || 3003;

server.listen(port, () => {
  console.log(`Order service is running on port ${port}`);
});
