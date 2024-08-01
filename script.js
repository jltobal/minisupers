
fetch('./bbdd.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(datosProductos => {
        console.log(datosProductos);

        var productosSinEspacios = datosProductos.trim();
        var productosArray = productosSinEspacios.split("|");
        console.log(productosArray);

        var productosJSON = [];
        for (var i = 0; i < productosArray.length; i++) {
            var productosPorLinea = productosArray[i].split(",");
            var nombre = productosPorLinea[0];
            var precio = productosPorLinea[1];
            var stock = productosPorLinea[2];
            var categoria = productosPorLinea[3];
            var producto = {
                nombre: nombre,
                precio: precio,
                stock: stock,
                categoria: categoria
            };
            productosJSON.push(producto);
        }

        var pepito = JSON.stringify(productosJSON, null, 2);
        console.log(pepito);

//JOACO DESDE ACA CAPAZ ME LA MANDO
        displayProducts(productosJSON);
        //HASTA ACA

    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

    //Y DESDE ACA TAMBIEN
function displayProducts(productosJSON) {
    const container = document.getElementById('product-container');

    productosJSON.forEach((producto, index) => {
        if (index >= 24) return;

        const itemDiv = document.createElement('div');
        itemDiv.className = `item col${index + 1}`;
        itemDiv.innerHTML = `
            <h4>${producto.nombre}</h4>
            <form>
                <label>Precio: $${producto.precio}</label><br>
                <label>Stock: ${producto.stock}</label><br>
                <label>Categoria: ${producto.categoria}</label><br>
                <input type="number" min="0" max="${producto.stock}" placeholder="0">
            </form>
        `;
        container.appendChild(itemDiv);
    });
}
//HASTA ACA