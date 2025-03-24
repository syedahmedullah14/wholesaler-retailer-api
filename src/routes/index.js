const express = require('express');
const wholesalerRoutes = require('./wholesaler.routes');
const retailerRoutes = require('./retailer.routes');

const router = express.Router();

router.use('/wholesalers', wholesalerRoutes);
router.use('/retailers', retailerRoutes);

module.exports = router;