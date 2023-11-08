let selectedImage = null; // Declarar la variable global para la imagen seleccionada
const profileImageInput = document.getElementById("profileImageInput");
const profileImg = document.getElementById("profile-img");

profileImageInput.addEventListener("change", (event) => {
  selectedImage = event.target.files[0]; 

  if (selectedImage) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profileImg.src = e.target.result; // Cargar la imagen desde el FileReader
    };
    reader.readAsDataURL(selectedImage); // Leer la imagen como una URL de datos
  }
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  function saveUserDataToLocalStorage() {
    const userData = {
      firstName: document.getElementById("nameInput1").value,
      secondName: document.getElementById("nameInput2").value,
      lastName1: document.getElementById("lastNameInput1").value,
      lastName2: document.getElementById("lastNameInput2").value,
      email: document.getElementById("emailInput").value,
      phoneNumber: document.getElementById("phoneInput").value,
      profileImage: profileImg.src, // Guardar la URL directamente
    };
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const dataURL = e.target.result;
        userData.profileImage = dataURL;
        // Guardar la imagen como una URL de datos en userData
        localStorage.setItem("userData", JSON.stringify(userData));
      };
      reader.readAsDataURL(selectedImage);
    }


  
    localStorage.setItem("userData", JSON.stringify(userData));
  
  }

  // Función para cargar los datos del usuario y la imagen de perfil desde el localStorage
  function loadUserDataFromLocalStorage() {
    const userData = JSON.parse(localStorage.getItem("userData"));
  
    if (userData) {
      document.getElementById("nameInput1").value = userData.firstName;
      document.getElementById("nameInput2").value = userData.secondName;
      document.getElementById("lastNameInput1").value = userData.lastName1;
      document.getElementById("lastNameInput2").value = userData.lastName2;
      document.getElementById("emailInput").value = userData.email;
      document.getElementById("phoneInput").value = userData.phoneNumber;

    // Cargar la imagen de perfil
    if (userData.profileImage) {
      const profileImage = new Image();
      profileImage.onload = function () {
        profileImg.src = userData.profileImage;
      };
      profileImage.src = userData.profileImage;
    }
  }
}

  loadUserDataFromLocalStorage();
  
  const saveButton = document.getElementById("saveChanges");
  saveButton.addEventListener("click", saveUserDataToLocalStorage);
