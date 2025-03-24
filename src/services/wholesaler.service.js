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
  
  // API 3: To Get monthly turnover for each wholesaler for a year
  async getMonthlyTurnover(year = 2021) {
    try {
      const result = await Stock.findAll({
        attributes: [
          [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "date"')), 'month'],
          'wholesaler_id',
          [sequelize.fn('SUM', sequelize.col('stock_amount')), 'total_turnover']
        ],
        where: sequelize.where(
          sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "date"')),
          year
        ),
        group: ['wholesaler_id', sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "date"'))],
        order: ['wholesaler_id', [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM "date"')), 'ASC']],
        include: [{
          model: Wholesaler,
          attributes: ['name']
        }]
      });
      
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new WholesalerService();