var async = require('async');
const fs = require('fs');
const Food = require('../models/food');
const parse = require('csv-parse');
const secrets = require('./secrets');

// connect to database TODO: gather up w/ the one in app
var mongoose = require('mongoose');
const food = require('../models/food');
var mongoDB = secrets.dbURL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse csv
fs.readFile('./raw-data-ayurveda-api.csv', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return;
  }
  parse(data, {columns: true}, (err, output) => {
    if (err) {
      console.log(err)
      return;
    }
    createCollection(output);
  })
});

// create collection anew
async function createCollection (data) {
  await db.dropDatabase();

  let foods = [];

  for (let i = 0; i < data.length; i++) {
    let obj = data[i]
    obj.vata = parseInt(obj.vata) || 0;
    obj.pitta = parseInt(obj.pitta) || 0;
    obj.kapha = parseInt(obj.kapha) || 0;
    const index = foods.findIndex(food => food.name === obj.name);
    if (index === -1) {
      const newFood = {
        groups: [obj.group],
        name: obj.name,
        vata: obj.vata,
        kapha: obj.kapha,
        pitta: obj.pitta,
      }
      foods.push(newFood)
    } else {
      const existingFood = foods[index]
      foods[index] = {
        name: existingFood.name,
        vata: existingFood.vata || obj.vata,
        pitta: existingFood.pitta || obj.pitta,
        kapha: existingFood.kapha || obj.kapha,
        groups: existingFood.groups.includes(obj.group) ? existingFood.groups : existingFood.groups.concat([obj.group])
      }
    }
  }

  await Food.insertMany(foods);

  mongoose.connection.close();

}