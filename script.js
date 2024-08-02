let productosJSON = [];


//Se levanta el archivo bbdd.txt el cual funciona como "base de datos". Se transforma en un JSON para utilizar mas adelante.
fetch("./bbdd.txt")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((datosProductos) => {
    console.log(datosProductos);

    var productosSinEspacios = datosProductos.trim();
    var productosArray = productosSinEspacios.split("|");
    console.log(productosArray);

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
        categoria: categoria,
      };
      productosJSON.push(producto);
    }

    var pepito = JSON.stringify(productosJSON, null, 2);
    console.log(pepito);

    displayProducts(productosJSON);

    //Se recorre el JASON y se crea un div por cada produco y se muestra en el DOM.
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

function displayProducts(productosJSON) {
  const container = document.getElementById("product-container");

  productosJSON.forEach((producto, index) => {
    if (index >= 24) return;

    const itemDiv = document.createElement("div");
    itemDiv.className = `item col${index + 1}`;
    itemDiv.innerHTML = `
                <h4>${producto.nombre}</h4>
                <div>
                    <label>Precio: $${producto.precio}</label><br>
                    <input type="number" min="0" max="${producto.stock}" placeholder="0" data-index="${index}">
                </div>
            `;
    container.appendChild(itemDiv);
  });
}

//Calcula el total de la compra
//Lee los inputs, lo asocia con el producto que corresponde dentro de su div,
//identifica el precio y, si corresponde, hace el descuento.
document
  .querySelector(".btn_comprar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let inputs = document.querySelectorAll('input[type="number"]');
    let total = 0;

    inputs.forEach((input) => {
      const cantidad = parseInt(input.value) || 0;
      const index = parseInt(input.getAttribute("data-index"));

      if (!isNaN(index) && productosJSON[index]) {
        const producto = productosJSON[index];
        let precio = parseInt(producto.precio);

        if (producto.categoria == "1") {
          precio = precio * 0.7;
        }
        const subtotal = cantidad * precio;
        total += subtotal;
      }
    });

    console.log(total);
    let div_precio = document.querySelector(".valor_total");
    div_precio.innerHTML = `El precio de su comrpa es $ ${total}`;
  });
