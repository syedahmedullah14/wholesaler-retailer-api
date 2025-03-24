const sequelize = require('../config/db.config');
const Wholesaler = require('./wholesaler.model');
const Retailer = require('./retailer.model');
const Stock = require('./stock.model');

//many-to-many relationship
Wholesaler.belongsToMany(Retailer, { through: 'wholesaler_retailer' });
Retailer.belongsToMany(Wholesaler, { through: 'wholesaler_retailer' });

//relationships for stock
Stock.belongsTo(Wholesaler, { foreignKey: 'wholesaler_id' });
Stock.belongsTo(Retailer, { foreignKey: 'retailer_id' });
Wholesaler.hasMany(Stock, { foreignKey: 'wholesaler_id' });
Retailer.hasMany(Stock, { foreignKey: 'retailer_id' });

module.exports = {
  sequelize,
  Wholesaler,
  Retailer,
  Stock
};