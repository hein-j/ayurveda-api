const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required().lowercase()
})