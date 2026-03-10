require('dotenv').config()
const app = require('./src/app');
const { connect } = require('./src/broker/broker');
const connectDB = require('./src/db/database')

const port = process.env.PORT || 3001;

connectDB()
connect()

app.listen(port, () => {
  console.log('Product service is running on port ' + port);
})