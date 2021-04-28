const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingType = {type: Number, min: 0, max: 4}
const FoodSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    vata: ratingType,
    pitta: ratingType,
    kapha: ratingType,
    groups: [{type: String, maxLength: 100, required: true}],
  }
)

module.exports = mongoose.model('Food', FoodSchema);