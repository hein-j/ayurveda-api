const Joi = require('joi');
const {allowedGroups} = require('../../models/food');

module.exports = function (queryObj) {

  let obj = {};

  for (let key in queryObj) {
    obj[key.toLowerCase()] = queryObj[key].toLowerCase();
  }

  const doshas = ['v', 'p', 'k'];

  doshas.forEach(dosha => {
    if (dosha in obj) {
      const arr = obj[dosha].split(',').map(str => parseInt(str));
      if (!('doshas' in obj)) {
        obj['doshas'] = {};
      }
      obj.doshas[dosha] = arr;
      delete obj[dosha];
    }
  });

  if ('groups' in obj) {
    obj['groups'] = obj['groups'].split(',');
  }

  if ('contains' in obj) {
    const array = obj['contains'].split(',');
    let pattern = array.reduce((pattern, string) => {
      return pattern.concat(`|${string}`);
    }, '');
    pattern = pattern.slice(1);
    obj['contains'] = pattern;
  }

  const doshaPattern = Joi.array().items(Joi.number().integer().min(0).max(4));

  const schema = Joi.object({
    doshas: Joi.object({
      v: doshaPattern,
      p: doshaPattern,
      k: doshaPattern,
    }),
    groups: Joi.array().items(Joi.string().valid(...allowedGroups)),
    details: Joi.boolean(),
    contains: Joi.string().invalid('', '  ')
  })

  return schema.validate(obj);
}