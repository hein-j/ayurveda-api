const {dbURL} = require('./secrets');

module.exports = function () {
  var mongoose = require('mongoose');
  var mongoDB = dbURL;
  mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  return db;
}