const {v4: uuid} = require ('uuid');
const APIkey = require('../../models/apiKey');

module.exports = async function (email) {
  const preExisting = await APIkey.findOne({email: email}).exec();
  if (preExisting) {
    let err = new Error('Email already exists');
    err.statusCode = 409;
    throw err;
  }

  const docObj = {email: email, key: uuid()};
  try {
    await APIkey.create(docObj);
  } catch {
    let err = new Error('Could not create key');
    err.statusCode = 500;
    throw err;
  }

  return docObj;
}