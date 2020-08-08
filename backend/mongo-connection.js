const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/seatplanner"

async function main() {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  console.log('connected')
}

main()
