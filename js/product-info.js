document.addEventListener("DOMContentLoaded", () => {
  // Obtener el identificador del producto guardado en el almacenamiento local
  const selectedProductId = localStorage.getItem("selectedProductId");

  // Verificar si se ha seleccionado un producto válido
  if (!selectedProductId) {
    // Si no hay un identificador de producto válido, muestra un mensaje de error o redirige a una página de error
    console.error(
      "Identificador de producto no encontrado en el almacenamiento local."
    );
    // Puedes redirigir al usuario a una página de error o mostrar un mensaje en esta página.
    return;
  }

  // Realizar una solicitud para obtener la información del producto usando el identificador
  const productInfoUrl = `${PRODUCT_INFO_URL}${selectedProductId}${EXT_TYPE}`;

  fetch(productInfoUrl)
    .then((response) => response.json())
    .then((product) => {
      // Una vez que obtenemos la información del producto, la mostramos en la página
      const productInfoContainer = document.getElementById("product-info");
      productInfoContainer.classList.add("card", "rounded-3", "m-4", "shadow");

      // Creamos un elemento div para el carrusel
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel", "slide");
      carouselContainer.id = "product-carousel"; // Asigna un ID al carrusel
      carouselContainer.setAttribute("data-ride", "carousel");

      // Creamos la lista de imágenes del carrusel
      const carouselInner = document.createElement("div");
      carouselInner.classList.add("carousel-inner");

      // Iteramos a través del array 'images' y crea elementos 'div' para cada imagen
      product.images.forEach((imageUrl, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        if (index === 0) {
          carouselItem.classList.add("active");
        }

        const productImage = document.createElement("img");
        productImage.src = imageUrl;
        productImage.classList.add("d-block", "w-50", "mx-auto", "m-4", "rounded"); // Clases para imágenes responsivas

        carouselItem.appendChild(productImage);
        carouselInner.appendChild(carouselItem);
      });

      // Agregamos el carrusel al contenedor de información del producto
      carouselContainer.appendChild(carouselInner);
      productInfoContainer.appendChild(carouselContainer);

      const productNameElement = document.createElement("h1");
      productNameElement.textContent = product.name;
      productNameElement.classList.add(
        "card-title",
        "display-4",
        "text-danger"
      );

      const productDescriptionElement = document.createElement("p");
      productDescriptionElement.textContent = product.description;
      productDescriptionElement.classList.add("card-text");

      const productPriceElement = document.createElement("p");
      productPriceElement.textContent = `Precio: ${product.currency} ${product.cost}`;
      productPriceElement.classList.add("card-text");

      const productSoldElement = document.createElement("p");
      productSoldElement.textContent = `Cantidad de productos vendidos: ${product.soldCount}`;
      productSoldElement.classList.add("card-text", "text-secondary", "mb-4");

      // Agregamos los elementos de texto al contenedor de información del producto
      productInfoContainer.appendChild(productNameElement);
      productInfoContainer.appendChild(productDescriptionElement);
      productInfoContainer.appendChild(productPriceElement);
      productInfoContainer.appendChild(productSoldElement);

      // Inicializamos el carrusel utilizando jQuery 
      $(document).ready(function () {
        $("#product-carousel").carousel();
      });
    })
    .catch((error) => {
      console.error("Error al obtener la información del producto:", error);
    });
});
