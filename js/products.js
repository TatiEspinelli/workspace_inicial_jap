// Función para obtener la URL de la categoría específica
function getCategoryURL(catID) {
  // La función toma el argumento catID
  return `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`; //y devuelve una URL construida usando ese verificador
}

// Función para crear el contenido HTML de un producto
function createProductHTML(product) {
  //Toma un objeto 'product' como argumento y crea el contenido HTML que representa al producto
  return `
    <div class="d-flex align-items-center">
      <img src="${product.image}" alt="${product.name}" style="width: 25%;" class="mr-3 product-image">
      <div style="width:100%;">
        <h5 style="margin-left: 5px;" class="fw-bold display-8 product-title">${product.name}</h5>
        <p style="margin-left: 5px;" class="product-price"> ${product.currency} ${product.cost}</p>
        <p style="margin-left: 5px;" class="product-description">${product.description}</p>
        <p style="margin-left: 5px;" class="text-end">${product.soldCount} vendidos</p>
      </div>
    </div>
  `;
}

// Función para cargar los productos desde la URL
async function loadProductsFromURL(url) {
  try {
    const response = await fetch(url); // Hacemos la solicitud a la URL usando fetch
    const data = await response.json(); // Convertimos la respuesta JSON en un objeto JavaScript
    return data.products; // Devuelve la lista de productos desde la propeidad 'products' de ese objeto
  } catch (error) {
    console.error("Error al obtener los productos:", error); // Si hay un error, imprimimos el mensaje de error en consola
    return [];
  }
}

// Función para agregar productos al contenedor
function displayProducts(products, container) {
  // La función toma la lista products y un contenedor HTML (container) como argumentos
  products.forEach((product) => {
    // Iteramos a través de la lista de productos, crea los elementos para cada producto y los agrega al contenedor
    const productCard = document.createElement("div");
    productCard.className =
      "list-group-item product-item d-flex justify-content-between align-items-center";
    productCard.innerHTML = createProductHTML(product);
    container.appendChild(productCard);
  });
}

// Función para cargar y mostrar productos en el contenedor
async function loadAndDisplayProducts() {
  // Obtenemos el contenedor de productos del HTML
  productContainer = document.getElementById("product-list");

  // Obtenemos el identificador de categoría del almacenamiento local
  const catID = localStorage.getItem("catID");
  if (!catID) {
    // Si el identificador no está presente, muestra un mensaje de error
    console.error(
      "Identificador de categoría no encontrado en el almacenamiento local."
    );
    return;
  }

  const url = getCategoryURL(catID); // Si el identificador está presente, construye la URL de la categoría
  products = await loadProductsFromURL(url); // Almacena los productos cargados en la variable products
  displayProducts(products, productContainer); // y los muestra en el contendor
}

// Función para filtrar productos por rango de precio
function filterByPrice(products, minPrice, maxPrice) {
  // Utilizamos el método 'filter' para iterar sobre los productos y devolver solo aquellos que cumplan la condición dada
  return products.filter((product) => {
    // Convierte el precio del producto a un número de punto flotante
    const productPrice = parseFloat(product.cost);
    // Devuelve 'true' si el precio del producto está dentro del rango especificado
    return productPrice >= minPrice && productPrice <= maxPrice;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const rangeFilterButton = document.getElementById("rangeFilterCount");
  const clearRangeFilterButton = document.getElementById("clearRangeFilter");

  // Evento click en el botón de filtrar
  rangeFilterButton.addEventListener("click", async () => {
    // Obtiene los valores de los campos de entrada de rango de precio
    const minPrice =
      parseFloat(document.getElementById("rangeFilterCountMin").value) || 0;
    const maxPrice =
      parseFloat(document.getElementById("rangeFilterCountMax").value) ||
      Infinity;

    try {
      const catID = localStorage.getItem("catID"); // Obtiene el identificador de categoría del almacenamiento local
      if (!catID) {
        console.error(
          "Identificador de categoría no encontrado en el almacenamiento local."
        );
        return;
      }

      const url = getCategoryURL(catID); // Construye la URL de la categoría usando el identificador
      const products = await loadProductsFromURL(url); // Carga los productos desde la URL
      let filteredProducts = filterByPrice(products, minPrice, maxPrice); // Filtra los productos por rango de precio usando la función 'filterByPrice'

      productContainer = document.getElementById("product-list"); // Obtenemos el contenedor de productos
      productContainer.innerHTML = ""; // Limpiamos el contenido existente

      // Mostramos los productos filtrados en el contenedor
      displayProducts(filteredProducts, productContainer);
    } catch (error) {
      console.error("Error al cargar y mostrar los productos:", error);
    }
  });

  // Evento click en el botón de limpiar
  clearRangeFilterButton.addEventListener("click", async () => {
    try {
      const catID = localStorage.getItem("catID");
      if (!catID) {
        console.error(
          "Identificador de categoría no encontrado en el almacenamiento local."
        );
        return;
      }

      const url = getCategoryURL(catID);
      const products = await loadProductsFromURL(url);

      const productContainer = document.getElementById("product-list");
      productContainer.innerHTML = ""; // Limpiamos el contenido existente

      // Mostramos todos los productos en el contenedor
      displayProducts(products, productContainer);

      // Restauramos los campos de entrada y botones
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";
    } catch (error) {
      console.error("Error al cargar y mostrar los productos:", error);
    }
  });

  // Cargamos y mostramos productos al cargar la página
  loadAndDisplayProducts();
});
