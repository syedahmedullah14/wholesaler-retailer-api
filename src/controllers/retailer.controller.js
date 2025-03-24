const retailerService = require('../services/retailer.service');

class RetailerController {
  async getRetailersWithSingleWholesaler(req, res) {
    try {
      const result = await retailerService.getRetailersWithSingleWholesaler();
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new RetailerController();