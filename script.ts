import * as fs from 'fs';

const bbdd= fs.readFileSync('./bbdd.txt', "utf8");

console.log(bbdd)

const datosProductos: string= fs.readFileSync('./bbdd.txt', 'utf-8');
const productosSinEspacios: string = datosProductos.trim();
const productosArray: string[] = productosSinEspacios.split("|"); 
console.log(productosArray);

const productosJSON: any[] =[];

for (let i:number=0; i < productosArray.length; i++){
    const productosPorLinea: string[] = productosArray[i].split(",");
    const nombre = productosPorLinea[0];
    const precio = productosPorLinea[1];
    const stock = productosPorLinea[2];

    const producto={
        nombre: nombre,
        precio: precio,
        stock: stock
    }

    productosJSON.push(producto);

    }
const pepito=JSON.stringify(productosJSON, null, 2);

console.log(pepito);

