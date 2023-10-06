const userID = 25801;
const url = `${CART_INFO_URL}${userID}.json`;

//Definimos una función para generar las filas
function createQueue(element) {
  const queue = document.createElement("tr");
  queue.innerHTML = `
        <td><img src="${
          element.image
        }" class="miniatura" class="img-thumbnail" class="img-fluid"></td>
        <td>${element.name}</td>
        <td class="costo-cell">${element.unitCost} ${element.currency}</td>
        <td><input type="number" value="${
          element.count
        }" class="col-sm-2 form-control-sm cantidad-input"  min="0"></td>
        <td class="subtotal-cell">${element.unitCost * element.count} ${
    element.currency
  }</td>
    `;
  return queue;
}

document.addEventListener("DOMContentLoaded", () => {
  // Función para calcular el subtotal de una fila
  function calcularSubtotal(fila) {
    const cantidadInput = fila.querySelector(".cantidad-input");
    const costoCell = fila.querySelector(".costo-cell");
    const subtotalCell = fila.querySelector(".subtotal-cell");

    const cantidad = parseInt(cantidadInput.value);
    const costoUnitario = parseFloat(costoCell.textContent.split(" ")[0]); // Obtén el valor numérico del costo

    const subtotal = cantidad * costoUnitario;
    subtotalCell.textContent = subtotal.toFixed(2) + " USD";
  }

  // Trae los datos del carrito
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const productInfoDiv = document.getElementById("cart-products");
      const product = data.articles[0];

      // Creamos una fila con los datos del producto
      let queue = createQueue(product);

      // Agregamos la fila a la tabla
      productInfoDiv.appendChild(queue);

      // Agregamos un evento "input" al campo de cantidad en esta fila
      const cantidadInput = queue.querySelector(".cantidad-input");
      cantidadInput.addEventListener("input", () => calcularSubtotal(queue));
    })
    .catch((error) => {
      console.error("Error al cargar el carrito de compras:", error);
    });
});
