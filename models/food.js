const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingType = {type: Number, min: 0, max: 4};
const allowedGroups = ['beverages', 'condiments', 'dairy', 'fruits', 'grains', 'herbs', 'legumes', 'meat', 'nuts', 'oils', 'seeds', 'spices', 'supplements', 'sweeteners', 'vegetables']
const FoodSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    v: ratingType,
    p: ratingType,
    k: ratingType,
    groups: [{type: String, maxLength: 100, required: true, enum: allowedGroups}],
  },
  {versionKey: false}
)

exports.Food = mongoose.model('Food', FoodSchema);
exports.ratingType = ratingType;
exports.allowedGroups = allowedGroups;
