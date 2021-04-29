var express = require('express');
const apiKeyController = require('../controllers/apiKeyController');

const router = express.Router();

router.post('/', apiKeyController);


module.exports = router;
