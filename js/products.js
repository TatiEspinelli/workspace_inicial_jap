window.addEventListener("DOMContentLoaded", async () => {
  const productContainer = document.getElementById("product-list"); // Obtenemos el contenedor donde mostraremos los productos

  try {
    // Obtenemos el identificador de categoría almacenado en el almacenamiento local
    const catID = localStorage.getItem("catID");
    
    // Verificamos si se encontró el identificador de categoría
    if (!catID) {
      console.error(
        "Identificador de categoría no encontrado en el almacenamiento local."
      );
      return;
    }

    // Construimos la URL utilizando el identificador de categoría
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    // Realizamos la solicitud a la URL que contiene los productos en JSON
    const response = await fetch(url); // Usamos la URL construida con el identificador

    // Convertimos la respuesta JSON en un objeto JavaScript
    const data = await response.json();

    // Iteramos a través de los datos y mostramos cada producto en el contenedor
    data.products.forEach((product) => {
      const productCard = document.createElement("div"); // Creamos un div para cada producto
      // Aplicamos estilos
      productCard.className =
        "list-group-item product-item d-flex justify-content-between align-items-center";
      // Generamos el contenido html para el producto
      productCard.innerHTML = `
          <div class="d-flex align-items-center">
            <img src="${product.image}"  alt="${product.name}" style="width: 25%;" class="mr-3 product-image">
            <div style="width:100%;">
              <h5 style ="margin-left: 5px;" class=" fw-bold display-8 product-title">${product.name}</h5>
              <p style ="margin-left: 5px;" class="product-price"> ${product.currency} ${product.cost}</p>
              <p style ="margin-left: 5px;" class="product-description" >${product.description}</p>
              <p style ="margin-left: 5px;" class=" text-end"> ${product.soldCount} vendidos</p>
            </div>
          </div>
        `;
      productContainer.appendChild(productCard); // Agregamos el elemento del producto al contenedor principal
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
});
