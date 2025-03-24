const { Wholesaler, Retailer, Stock, sequelize } = require('../models');

async function seedDatabase() {
  try {
    // Clear existing data
    await Stock.destroy({ where: {} });
    await sequelize.query('DELETE FROM "wholesaler_retailer"');
    await Wholesaler.destroy({ where: {} });
    await Retailer.destroy({ where: {} });
    
    // wholesalers
    const wholesalers = await Wholesaler.bulkCreate([
      { name: 'Global Supplies Inc', mobile_number: '9876543210' },
      { name: 'Prime Distributors', mobile_number: '8765432109' },
      { name: 'Metro Wholesalers', mobile_number: '7654321098' }
    ]);
    
    // retailers
    const retailers = await Retailer.bulkCreate([
      { name: 'City Market', mobile_number: '1234567890' },
      { name: 'Urban Store', mobile_number: '2345678901' },
      { name: 'QuickMart', mobile_number: '3456789012' },
      { name: 'Value Shop', mobile_number: '4567890123' },
      { name: 'Local Corner', mobile_number: '5678901234' }
    ]);
    
    // associations between wholesalers and retailers
    await wholesalers[0].addRetailers([retailers[0], retailers[1], retailers[2]]);
    await wholesalers[1].addRetailers([retailers[1], retailers[3], retailers[4]]);
    await wholesalers[2].addRetailers([retailers[0], retailers[4]]);
    
    // Generate monthly stock data for Jan 2021 - Dec 2021
    const stockData = [];
    const months = 12;
    
    for (let month = 0; month < months; month++) {
      const date = new Date(2021, month, 15); // 15th of each month
      
      // Each wholesaler sells to each of its retailers
      for (const wholesaler of wholesalers) {
        const associatedRetailers = await wholesaler.getRetailers();
        
        for (const retailer of associatedRetailers) {
          // Random stock amount between 1000 and 10000
          const stockAmount = Math.floor(Math.random() * 9000) + 1000;
          
          stockData.push({
            wholesaler_id: wholesaler.id,
            retailer_id: retailer.id,
            stock_amount: stockAmount,
            date
          });
        }
      }
    }
    
    // Create stock entries
    await Stock.bulkCreate(stockData);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase;