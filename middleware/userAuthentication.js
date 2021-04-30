const APIkey = require('../models/apiKey');
const {validate: uuidValidate} = require('uuid');

module.exports = function (req, res, next) {
  const key = req.headers['authorization'];

  if (!key) {
    res.status(403).json('API key missing');
    return;
  }
  if (!uuidValidate(key)) {
    res.status(401).json('Wrong API key');
    console.log('yu')
    return;
  }
  APIkey.findOneAndUpdate({key: key}, {$inc : {accessed : 1}}).exec((err, apiKey) => {
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