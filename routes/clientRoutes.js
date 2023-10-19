const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

router.get('/clients', (req, res) => {
  const clients = clientController.getClients();
  res.json(clients);
});

router.post('/clients', (req, res) => {
  const newClient = req.body;
  const client = clientController.createClient(newClient);
  if (client) {
    res.json(client);
  } else {
    res.sendStatus(400);
  }
});

router.put('/clients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedClient = req.body;
  const client = clientController.updateClient(id, updatedClient);
  if (client) {
    res.json(client);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/clients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = clientController.deleteClient(id);
  if (success) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
