const { Wholesaler, Retailer, Stock, sequelize } = require('../models');
const { Op } = require('sequelize');

class WholesalerService {

  // API 1: To get wholesaler with associated retailers
  async getWholesalerWithRetailers(wholesalerId) {
    try {
      const wholesaler = await Wholesaler.findByPk(wholesalerId, {
        include: [{ model: Retailer }]
      });
      
      if (!wholesaler) {
        throw new Error('Wholesaler not found');
      }
      
      return wholesaler;
    } catch (error) {
      throw error;
    }
  }
  

}

module.exports = new WholesalerService();