const mongoose = require('mongoose');
const {validate: uuidValidate} = require('uuid');

const Schema = mongoose.Schema;

const apiKeySchema = new Schema(
  {
    email: {type: String, required: true, maxLength: 100},
    key: {type: String, required: true, validate: uuidValidate}
  },
  {versionKey: false}
)

module.exports = mongoose.model('APIkey', apiKeySchema);