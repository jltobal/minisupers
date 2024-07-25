"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var bbdd = fs.readFileSync('./bbdd.txt', "utf8");
console.log(bbdd);
var datosProductos = fs.readFileSync('./bbdd.txt', 'utf-8');
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
