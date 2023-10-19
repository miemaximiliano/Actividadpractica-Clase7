const saleModel = require('../models/saleModel');

function getSales() {
  return saleModel.readSales();
}

function createSale(sale) {
  const sales = saleModel.readSales();
  sale.id = sales.length + 1;
  sales.push(sale);
  saleModel.writeSales(sales);
  return sale;
}

function updateSale(id, updatedSale) {
  const sales = saleModel.readSales();
  const index = sales.findIndex((sale) => sale.id === id);
  if (index !== -1) {
    sales[index] = { id, ...updatedSale };
    saleModel.writeSales(sales);
    return sales[index];
  } else {
    return null;
  }
}

function deleteSale(id) {
  const sales = saleModel.readSales();
  const index = sales.findIndex((sale) => sale.id === id);
  if (index !== -1) {
    sales.splice(index, 1);
    saleModel.writeSales(sales);
    return true;
  } else {
    return false;
  }
}

module.exports = { getSales, createSale, updateSale, deleteSale };
