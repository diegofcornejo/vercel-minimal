const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config()


const cors = require('cors')


const app = express();
app.use(cors())

// Parse json encoded in the request body
app.use(bodyParser.json({ limit: '50mb' }));

// allow cors from all - no hustle and never safe
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
})

app.get('/api', (req, res )=>{
  res.send({
    hola : true
  })
})

// Passport initialization
app.use(passport.initialize());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

app.use('/api/auth', require('./routes/auth'))

app.use('/api/user', require('./routes/user'))
app.use('/api/app', require('./routes/app'))
// start server
module.exports = app
