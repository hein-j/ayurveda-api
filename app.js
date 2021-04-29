var express = require('express');
var foodsRouter = require('./routes/foods');
var apiKeyRouter = require('./routes/apikey');
const authentication = require('./middleware/authentication');
const connectDB = require('./config/connectDB');

connectDB();

var app = express();

app.use(express.json());


app.use(['/foods', '/apikey'], authentication);
app.use('/foods', foodsRouter);
app.use('/apikey', apiKeyRouter);

module.exports = app;
