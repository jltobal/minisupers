"use strict";

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
            var producto = {
                nombre: nombre,
                precio: precio,
                stock: stock
            };
            productosJSON.push(producto);
        }

        var pepito = JSON.stringify(productosJSON, null, 2);
        console.log(pepito);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
