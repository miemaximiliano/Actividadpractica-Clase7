const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
app.use(cors());
app.use(express.json());
app.use(clientRoutes);
app.use(productRoutes);
app.use(saleRoutes);

app.listen(port, () => {
  console.log('Servidor Express en ejecución en el puerto ' + port);
});


const fs = require('fs');
const path = require('path');

function updateData(filename, data) {
  const filePath = path.join(__dirname, '../data', filename); // Construye la ruta completa al archivo
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } else {
    console.error(`El archivo ${filename} no existe en la ubicación esperada.`);
  }
}
