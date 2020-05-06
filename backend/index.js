if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Please visit: http://localhost:${port}`)
  // console.log('PORT',process.env.PORT);
  // console.log('MONGODB_CONNECTION_STRING', process.env.MONGODB_CONNECTION_STRING);
})