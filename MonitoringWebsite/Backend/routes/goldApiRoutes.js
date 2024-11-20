const express = require('express');
const { getGoldPrices } = require('../controllers/goldPriceApi');
const router = express.Router();

// Define the route for gold prices
router.get('/gold-prices', getGoldPrices);

module.exports = router;
