const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const personRouter = require('./routes/person')
const tableRouter = require('./routes/table')

require('./mongo-connection')

const app = express()

app.use(cors())

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.use('/guest', personRouter)
app.use('/table', tableRouter)

app.get('/', (req, res) => {
  res.render('index')
})

module.exports = app