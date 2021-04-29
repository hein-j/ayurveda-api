const {Food} = require('../models/food');

module.exports = function (req, res) {
  Food.findById(req.params.id, (err, food) => {
    if(err) {
      res.status(400).json('Invalid ID');
      return;
    }
    if(!food) {
      res.status(200).json({});
      return;
    }
    res.status(200).json(food)
  })
}