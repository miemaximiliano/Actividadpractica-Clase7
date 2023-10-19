document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const productData = {
        prod: formData.get('prod'),
        price: parseFloat(formData.get('price'))
    };
    postData('products', productData);
});

document.getElementById('updateProductForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const productId = parseInt(document.getElementById('productId').value);
    const newProd = document.getElementById('newProd').value;
    const newPrice = parseFloat(document.getElementById('newPrice').value);
    updateProduct(productId, newProd, newPrice);
});
function updateProduct(productId, newProd, newPrice) {
    const newData = {
        prod: newProd,
        price: newPrice
    };

    updateData('products', productId, newData);
}


document.getElementById('deleteProductForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const productIdToDelete = parseInt(document.getElementById('productIdToDelete').value);
    deleteData('products', productIdToDelete);
});

document.getElementById('clientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const clientData = {
        name: formData.get('name'),
        email: formData.get('email')
    };
    postData('clients', clientData);
});

document.getElementById('updateClientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const clientId = parseInt(document.getElementById('clientId').value);
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    updateClient(clientId, newName, newEmail);
});

function updateClient(clientId, newName, newEmail) {
    const newData = {
        name: newName,
        email: newEmail
    };

    updateData('clients', clientId, newData);
}

document.getElementById('deleteClientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const clientIdToDelete = parseInt(document.getElementById('clientIdToDelete').value);
    deleteData('clients', clientIdToDelete);
});


document.getElementById('saleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const saleData = {
        client_id: parseInt(formData.get('clientId')),
        saleDate: formData.get('saleDate'), 
        product_id: parseInt(formData.get('productId')) 
    };
    postData('sales', saleData);
});

document.getElementById('deleteSaleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const saleIdToDelete = parseInt(document.getElementById('saleIdToDelete').value);
    deleteData('sales', saleIdToDelete);
});

function postData(endpoint, data) {
    fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(data => {
        alert(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} creado con éxito. ID: ${data.id}`);
    })
    .catch(error => {
        console.error(`Error al crear el ${endpoint}:`, error);
    });
}

function updateData(endpoint, id, newData) {
    fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => {
        if (response.ok) {
            alert(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} actualizado con éxito.`);
        } else {
            alert(`Error al actualizar el ${endpoint}.`);
        }
    })
    .catch(error => {
        console.error(`Error al actualizar el ${endpoint}:`, error);
    });
}

function deleteData(endpoint, id) {
    fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} eliminado con éxito.`);
        } else {
            alert(`Error al eliminar el ${endpoint}.`);
        }
    })
    .catch(error => {
        console.error(`Error al eliminar el ${endpoint}:`, error);
    });
}
