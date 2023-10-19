const fs = require('fs');
const path = require('path');
const salesData = require('../data/sales.json');

function readSales() {
  return salesData.list;
}

function writeSales(sales) {
  salesData.list = sales;
  updateData('sales.json', salesData);
}

function updateData(filename, data) {
  const filePath = path.join(__dirname, '../data', filename); // Utiliza una ruta absoluta
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readSales, writeSales };
