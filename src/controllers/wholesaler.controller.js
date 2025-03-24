const wholesalerService = require('../services/wholesaler.service');

class WholesalerController {
  async getWholesalerWithRetailers(req, res) {
    try {
      const { id } = req.params;
      const result = await wholesalerService.getWholesalerWithRetailers(id);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async getMonthlyTurnover(req, res) {
    try {
      const { year } = req.query;
      const result = await wholesalerService.getMonthlyTurnover(year || 2021);
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

  async getMaxTurnoverFromRetailer(req, res) {
    try {
      const result = await wholesalerService.getMaxTurnoverFromRetailer();
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

module.exports = new WholesalerController();