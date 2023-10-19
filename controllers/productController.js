const productModel = require('../models/productModel');

function getProducts() {
  return productModel.readProducts();
}

function createProduct(product) {
  const products = productModel.readProducts();
  product.id = products.length + 1;
  products.push(product);
  productModel.writeProducts(products);
  return product;
}

function updateProduct(id, updatedProduct) {
  const products = productModel.readProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { id, ...updatedProduct };
    productModel.writeProducts(products);
    return products[index];
  } else {
    return null;
  }
}

function deleteProduct(id) {
  const products = productModel.readProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    productModel.writeProducts(products);
    return true;
  } else {
    return false;
  }
}

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
