const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/sales', (req, res) => {
  const sales = saleController.getSales();
  res.json(sales);
});

router.post('/sales', (req, res) => {
  const newSale = req.body;
  const sale = saleController.createSale(newSale);
  if (sale) {
    res.json(sale);
  } else {
    res.sendStatus(400);
  }
});

router.put('/sales/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSale = req.body;
  const sale = saleController.updateSale(id, updatedSale);
  if (sale) {
    res.json(sale);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/sales/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = saleController.deleteSale(id);
  if (success) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
