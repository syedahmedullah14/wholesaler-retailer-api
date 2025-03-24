const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Retailer = sequelize.define('retailer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Retailer;