const APIkey = require('../models/apiKey');
const {validate: uuidValidate} = require('uuid');
const {adminAPIkeyObj} = require('../config/secrets');

module.exports = function (req, res, next) {
  const key = req.headers['authorization'];
  if (key === adminAPIkeyObj.key) {
    req.isAdmin = true;
  }
  if (!key) {
    res.status(403).json('API key missing');
    return;
  }
  if (!uuidValidate(key)) {
    res.status(401).json('Wrong API key');
    return;
  }
  APIkey.findOne({key: key}, (err, apiKey) => {
    if (err) {
      res.status(500).json('Could not process request');
      return;
    }
    if (!apiKey) {
      res.status(401).json('Wrong API key');
      return;
    }
    next();
  })
}