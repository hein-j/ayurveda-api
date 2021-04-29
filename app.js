var express = require('express');
var foodsRouter = require('./routes/foods');
var apiKeyRouter = require('./routes/apikey');
const secrets = require('./config/secrets');
const authentication = require('./middleware/authentication');

var app = express();

//Set up mongoose connection
// TODO: relocate & let the url be imported into populatedb.js
var mongoose = require('mongoose');
var mongoDB = secrets.dbURL;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());


app.use(['/foods', '/apikey'], authentication);
app.use('/foods', foodsRouter);
app.use('/apikey', apiKeyRouter);

module.exports = app;
