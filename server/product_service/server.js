require('dotenv').config()
const app = require('./src/app');
const connectDB = require('./src/db/database')

const port = process.env.PORT || 3001;

connectDB()

app.listen(port, () => {
  console.log('Product service is running on port ' + port);
})