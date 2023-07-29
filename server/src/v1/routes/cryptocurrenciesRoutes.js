const express = require('express');
const { getAllCryptocurrencies } = require('../controllers/cryptocurrenciesController')

const router = express.Router();

router.get('/cryptocurrencies/:symbols', getAllCryptocurrencies);

module.exports = router;