const express = require('express');
const foodsRouter = require('./routes/foods');
const apiKeyRouter = require('./routes/apikey');
const authentication = require('./middleware/authentication');
const connectDB = require('./config/connectDB');
const helmet = require("helmet");

connectDB();

const app = express();

app.use(helmet());

app.use(express.json());

app.use(['/foods', '/apikey'], authentication);

app.use('/foods', foodsRouter);

app.use('/apikey', apiKeyRouter);

module.exports = app;
