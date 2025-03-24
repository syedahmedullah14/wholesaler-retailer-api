const express = require('express');
const retailerController = require('../controllers/retailer.controller');

const router = express.Router();

// API 2: Get retailers with single wholesaler
router.get('/single-wholesaler', retailerController.getRetailersWithSingleWholesaler);

module.exports = router;
