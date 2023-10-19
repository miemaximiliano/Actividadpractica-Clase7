const clientModel = require('../models/clientModel');

function getClients() {
  return clientModel.readClients();
}

function createClient(client) {
  const clients = clientModel.readClients();
  client.id = clients.length + 1;
  clients.push(client);
  clientModel.writeClients(clients);
  return client;
}

function updateClient(id, updatedClient) {
  const clients = clientModel.readClients();
  const index = clients.findIndex((client) => client.id === id);
  if (index !== -1) {
    clients[index] = { id, ...updatedClient };
    clientModel.writeClients(clients);
    return clients[index];
  } else {
    return null;
  }
}

function deleteClient(id) {
  const clients = clientModel.readClients();
  const index = clients.findIndex((client) => client.id === id);
  if (index !== -1) {
    clients.splice(index, 1);
    clientModel.writeClients(clients);
    return true;
  } else {
    return false;
  }
}

module.exports = { getClients, createClient, updateClient, deleteClient };
