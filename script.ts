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
    const categoria = productosPorLinea[3]

    const producto={
        nombre: nombre,
        precio: precio,
        stock: stock,
        categoria: categoria
    }

    productosJSON.push(producto);

    }
const pepito=JSON.stringify(productosJSON, null, 2);

console.log(pepito);

///categorias: 0 = infusiones, 1 = conservas/enlatados, 2 = bebidas, 3 = otros    NO OLVIDAR!

// mostrador de productos en el muy bobnito HTML de compras

function displayProducts(productosJSON: any[]) {
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
            </form>
        `;
        container?.appendChild(itemDiv);
    });
}

displayProducts(productosJSON);