const {Food} = require('../models/food');
const validateAndFormatQuery = require('../services/foods/validateAndFormatQuery');


module.exports = function (req, res) {
    
  let query = Food.find();

  const validationObj = validateAndFormatQuery(req.query);

  if(validationObj.error) {
    res.status(400).json('Invalid query');
    return;
  }

  const obj = validationObj.value;

  if ('doshas' in obj) {
    for (let dosha in obj.doshas) {
      query = query.where(dosha).in(obj.doshas[dosha]);
    }
  }

  if ('groups' in obj) {
    query = query.where('groups').in(obj.groups);
  }

  if ('contains' in obj) {
    query = query.where('name', new RegExp(obj.contains));
  }

  if (('details' in obj && !obj['details']) || !('details' in obj)) {
    query = query.select('_id name');
  }

  query.sort('name');

  
  query.exec((err, arr) => {
    if(err) {
      res.status(500).json('Query failed');
      return;
    }
    if(arr.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(arr);
  })
 
}