const fs = require('fs');
const path = require('path');
const productsData = require('../data/products.json');

function readProducts() {
  return productsData.list;
}

function writeProducts(products) {
  productsData.list = products;
  updateData('products.json', productsData);
}

function updateData(filename, data) {
  const filePath = path.join(__dirname, '../data', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readProducts, writeProducts };
