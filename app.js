const express = require('express');
const foodsRouter = require('./routes/foods');
const apiKeyRouter = require('./routes/apikey');
const authentication = require('./middleware/authentication');
const connectDB = require('./config/connectDB');

connectDB();

const app = express();

app.use(express.json());


app.use(['/foods', '/apikey'], authentication);
app.use('/foods', foodsRouter);
app.use('/apikey', apiKeyRouter);

module.exports = app;
