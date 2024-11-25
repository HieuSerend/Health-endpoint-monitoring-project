// routes/currencyApiRoutes.js
const express = require('express');
const { getCurrencyPrices } = require('../controllers/currencyPriceApi');

const router = express.Router();

router.get('/currency-prices', getCurrencyPrices);

module.exports = router;