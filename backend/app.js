require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const passportSetup = require('./passport-config')
const cookieSession = require('cookie-session')

const guestRouter = require('./routes/guest')
const tableRouter = require('./routes/table')
const boardRouter = require('./routes/board')
const authRouter = require('./routes/auth')

const { SESSION_SECRET } = process.env

require('./mongo-connection')

const app = express()
app.set('view engine', 'pug')
app.use(
  cookieSession({
    name: 'seatplannersession',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 * 24 hours
    keys: ["qwefgfds"]
  })
);
app.use(bodyParser.json())
app.use(require('express-session')({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

var corsOption = {
  origin: true,
  methods: `GET, HEAD, PUT, PATCH, POST, DELETE`,
  credentials: true
};
app.use(cors(corsOption));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/guest', guestRouter)
app.use('/table', tableRouter)
app.use('/board', boardRouter)
app.use('/auth', authRouter);

// app.get('/', (req, res) => {
//   res.render('index')
// })

module.exports = app