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

  // API 4: To Get max turnover of each wholesaler from a single retailer
  async getMaxTurnoverFromRetailer() {
    try {
      
      // Using PostgreSQL specific syntax for window functions
      const result = await sequelize.query(`
        WITH retailer_turnover AS (
          SELECT 
            w.id AS wholesaler_id, 
            w.name AS wholesaler_name,
            r.id AS retailer_id, 
            r.name AS retailer_name,
            SUM(s.stock_amount) AS total_turnover,
            RANK() OVER (PARTITION BY w.id ORDER BY SUM(s.stock_amount) DESC) AS rnk
          FROM 
            wholesalers w
            JOIN stocks s ON w.id = s.wholesaler_id
            JOIN retailers r ON r.id = s.retailer_id
          GROUP BY 
            w.id, w.name, r.id, r.name
        )
        SELECT 
          wholesaler_id, 
          wholesaler_name,
          retailer_id,
          retailer_name,
          total_turnover
        FROM 
          retailer_turnover
        WHERE 
          rnk = 1
        ORDER BY 
          wholesaler_id
      `, { type: sequelize.QueryTypes.SELECT });
      
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new WholesalerService();