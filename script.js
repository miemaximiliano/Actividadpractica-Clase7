document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    postData('products', formData);
});

document.getElementById('updateProductForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const productId = document.getElementById('productId').value;
    const newProd = document.getElementById('newProd').value;
    const newPrice = document.getElementById('newPrice').value;
    updateData('products', productId, newProd, newPrice);
});

document.getElementById('deleteProductForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const productIdToDelete = document.getElementById('productIdToDelete').value;
    deleteData('products', productIdToDelete);
});

document.getElementById('clientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    postData('clients', formData);
});

document.getElementById('updateClientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const clientId = document.getElementById('clientId').value;
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    updateData('clients', clientId, newName, newEmail);
});

document.getElementById('deleteClientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const clientIdToDelete = document.getElementById('clientIdToDelete').value;
    deleteData('clients', clientIdToDelete);
});

document.getElementById('saleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const saleData = {
        client_id: formData.get('clientId'),
        date: formData.get('saleDate'),
        products: {
            product_id: formData.get('productId'),
        }
    };
    postData('sales', saleData);
});

document.getElementById('deleteSaleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const saleIdToDelete = document.getElementById('saleIdToDelete').value;
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

function updateData(endpoint, id, name, email) {
    fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
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