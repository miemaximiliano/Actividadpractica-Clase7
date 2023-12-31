const fs = require('fs');
const path = require('path');
const clientsData = require('../data/clients.json');

function readClients() {
  return clientsData.list;
}

function writeClients(clients) {
  clientsData.list = clients;
  updateData('clients.json', clientsData);
}

function updateData(filename, data) {
  const filePath = path.join(__dirname, '../data', filename); // Utiliza una ruta absoluta
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readClients, writeClients };
