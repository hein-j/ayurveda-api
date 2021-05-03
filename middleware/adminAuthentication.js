const {adminAPIkeyObj, docURL} = require('../config/envVariables');

module.exports = function (req, res, next) {
  const key = req.headers['authorization'];
  if (key === adminAPIkeyObj.key) {
    req.isAdmin = true;
  }

  if (req.isAdmin && (req.headers.origin !== docURL)) {
    res.status(401).json('You are not authorized');
    return;
  }

  next();
}