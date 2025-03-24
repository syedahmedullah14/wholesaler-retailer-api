const express = require('express');
const wholesalerController = require('../controllers/wholesaler.controller');

const router = express.Router();

// API 1: Get wholesaler with associated retailers
router.get('/:id/retailers', wholesalerController.getWholesalerWithRetailers);

// API 3: Get monthly turnover for each wholesaler
router.get('/monthly-turnover', wholesalerController.getMonthlyTurnover);

// API 4: Get max turnover from a single retailer
router.get('/max-turnover', wholesalerController.getMaxTurnoverFromRetailer);

module.exports = router;