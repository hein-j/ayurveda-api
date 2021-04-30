const express = require('express');
const foodsRouter = require('./routes/foods');
const apiKeyRouter = require('./routes/apikey');
const userAuthentication = require('./middleware/userAuthentication');
const adminAuthentication = require('./middleware/adminAuthentication');
const connectDB = require('./config/connectDB');
const helmet = require("helmet");
var cors = require('cors')

connectDB();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(['/foods', '/apikey'], userAuthentication, adminAuthentication);

app.use('/foods', foodsRouter);

app.use('/apikey', apiKeyRouter);

module.exports = app;
