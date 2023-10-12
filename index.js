const express = require('express');
const fs = require('fs');
const productsData = require('./data/products.json');
const clientsData = require('./data/clients.json');
const salesData = require('./data/sales.json');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('<h1>Hello ' + Date.now() + '!</h1>');
});

app.get('/products', function (req, res) {
  res.json(productsData.list);
});

app.post('/products', function (req, res) {
  const newProduct = req.body;
  newProduct.id = productsData.list.length + 1;
  productsData.list.push(newProduct);
  updateData('products.json', productsData);
  res.json(newProduct);
});

app.put('/products/:id', function (req, res) {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = productsData.list.findIndex((product) => product.id === productId);
  if (index !== -1) {
    productsData.list[index] = { id: productId, ...updatedProduct };
    updateData('products.json', productsData);
    res.json(productsData.list[index]);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/products/:id', function (req, res) {
  const productId = parseInt(req.params.id);
  const index = productsData.list.findIndex((product) => product.id === productId);
  if (index !== -1) {
    productsData.list.splice(index, 1);
    updateData('products.json', productsData);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.get('/clients', function (req, res) {
  res.json(clientsData.list);
});

app.post('/clients', function (req, res) {
  const newClient = req.body;
  newClient.id = clientsData.list.length + 1;
  clientsData.list.push(newClient);
  updateData('clients.json', clientsData);
  res.json(newClient);
});

app.put('/clients/:id', function (req, res) {
  const clientId = parseInt(req.params.id);
  const updatedClient = req.body;
  const index = clientsData.list.findIndex((client) => client.id === clientId);
  if (index !== -1) {
    clientsData.list[index] = { id: clientId, ...updatedClient };
    updateData('clients.json', clientsData);
    res.json(clientsData.list[index]);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/clients/:id', function (req, res) {
  const clientId = parseInt(req.params.id);
  const index = clientsData.list.findIndex((client) => client.id === clientId);
  if (index !== -1) {
    clientsData.list.splice(index, 1);
    updateData('clients.json', clientsData);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.get('/sales', function (req, res) {
  res.json(salesData.list);
});

app.post('/sales', function (req, res) {
  const newSale = req.body;
  newSale.id = salesData.list.length + 1;
  salesData.list.push(newSale);
  updateData('sales.json', salesData);
  res.json(newSale);
});




app.delete('/sales/:id', function (req, res) {
  const saleId = parseInt(req.params.id);
  const index = salesData.list.findIndex((sale) => sale.id === saleId);
  if (index !== -1) {
    salesData.list.splice(index, 1);
    updateData('sales.json', salesData);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

function updateData(filename, data) {
  fs.writeFileSync(`./data/${filename}`, JSON.stringify(data, null, 2));
}

app.listen(port, () => {
  console.log('Servidor Express en ejecución en el puerto ' + port);
});