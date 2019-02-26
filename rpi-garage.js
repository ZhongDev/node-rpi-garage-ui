/// requires
require('dotenv').config()                      /// dotenv
var path = require('path')                      /// path
var express = require('express')                /// express
var app = express()
app.set('view engine', 'ejs');                  /// ejs
var expressWs = require('express-ws')(app)      /// express-ws
var rpi = require('./rpi-garage-exports.js')    /// exported functions

/// dotenv imports
const PORT = parseInt(process.env.PORT) || 80   /// server port

// index page
app.get('/', rpi.handler.get)
app.ws('/', rpi.handler.ws)

// static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// start server listening
app.listen(PORT, () => console.log(`rpi-garage.js is listening on port ${PORT}!`))