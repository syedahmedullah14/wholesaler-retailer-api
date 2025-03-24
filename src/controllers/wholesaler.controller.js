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

}

module.exports = new WholesalerController();