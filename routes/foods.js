var express = require('express');
const foodsController = require('../controllers/foodsController');
const foodsFoodController = require('../controllers/foodsFoodController');

const router = express.Router();

/* GET home page. */
router.get('/food/:id', foodsFoodController);

router.get('/', foodsController);

module.exports = router;
