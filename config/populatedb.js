const fs = require('fs');
const {Food} = require('../models/food');
const APIkey = require('../models/apiKey');
const parse = require('csv-parse');
const {adminAPIkeyObj} = require('./secrets');
const connectDB = require('./connectDB');
const mongoose = require('mongoose');


const db = connectDB();

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
    obj.v = parseInt(obj.v) || 0;
    obj.p = parseInt(obj.p) || 0;
    obj.k = parseInt(obj.k) || 0;
    const index = foods.findIndex(food => food.name === obj.name);
    if (index === -1) {
      const newFood = {
        groups: [obj.group],
        name: obj.name,
        v: obj.v,
        k: obj.k,
        p: obj.p,
      }
      foods.push(newFood)
    } else {
      const existingFood = foods[index]
      foods[index] = {
        name: existingFood.name,
        v: existingFood.v || obj.v,
        p: existingFood.p || obj.p,
        k: existingFood.k || obj.k,
        groups: existingFood.groups.includes(obj.group) ? existingFood.groups : existingFood.groups.concat([obj.group])
      }
    }
  }

  await Food.insertMany(foods);

  await APIkey.create(adminAPIkeyObj);

  console.log('alrighty!');
  mongoose.connection.close();

}