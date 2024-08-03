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
    var productosSinEspacios = datosProductos.trim();
    var productosArray = productosSinEspacios.split("|");

    for (var i = 0; i < productosArray.length; i++) {
      var productosPorLinea = productosArray[i].split(",");
      var nombre = productosPorLinea[0];
      var precio = productosPorLinea[1];
      var stock = productosPorLinea[2];
      var categoria = productosPorLinea[3];
      var img = productosPorLinea[4];
      var producto = {
        nombre: nombre,
        precio: precio,
        stock: stock,
        categoria: categoria,
        img: img,
      };
      productosJSON.push(producto);
    }

    var pepito = JSON.stringify(productosJSON, null, 2);
    console.log(pepito); //ACA IMPRIMO EL JASON EN LA CONSOLA

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
                <img src="${producto.img}">
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
      let cantidad = parseInt(input.value) || 0;
      const index = parseInt(input.getAttribute("data-index"));
      const max_stock = parseInt(productosJSON[index].stock);

      if (cantidad > max_stock) {
        alert("No hay suficiente stock del producto");
        cantidad = 0;
      }

      const producto = productosJSON[index];
      let precio = parseInt(producto.precio);

      if (producto.categoria == "1") {
        precio = precio * 0.7;
      }
      const subtotal = cantidad * precio;
      total += subtotal;
    });

    console.log(total);
    let div_precio = document.querySelector(".valor_total");
    div_precio.innerHTML = `El precio de su comrpa es $ ${total}`;

    document.querySelector(
      ".medios_pago"
    ).innerHTML = `<form action="" class="form_pagos">
      <label for="">MEDIOS DE PAGO</label>
      <select name="pago" id="">
        <option value="debito">DEBITO</option>
        <option value="credito">CREDITO</option>
        <option value="echek">ECHEK</option>
        <option value="transferencia">TRANSFERENCIA</option>
      </select>
      <button type="button" class="btn_continuar">IR A PAGAR</button>
    </form>`;

    //MEDIOS DE PAGO

    document
      .querySelector(".btn_continuar")
      .addEventListener("click", function (event) {
        event.preventDefault;
        alert("Gracias por comprar en MINISUPERS");
      });
  });
