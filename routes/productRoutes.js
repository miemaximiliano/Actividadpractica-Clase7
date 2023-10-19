const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products', (req, res) => {
  const products = productController.getProducts();
  res.json(products);
});

router.post('/products', (req, res) => {
  const newProduct = req.body;
  const product = productController.createProduct(newProduct);
  if (product) {
    res.json(product);
  } else {
    res.sendStatus(400);
  }
});

router.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;
  const product = productController.updateProduct(id, updatedProduct);
  if (product) {
    res.json(product);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = productController.deleteProduct(id);
  if (success) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// Manejador de errores
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;
