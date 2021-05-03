const {dbURL} = require('./envVariables');

module.exports = function () {
  const mongoose = require('mongoose');
  const mongoDB = dbURL;
  mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  return db;
}