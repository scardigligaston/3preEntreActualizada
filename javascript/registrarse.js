// Llamar al formulario:
const formRegistro = document.getElementById("form-registro");

const mostrarContrasenaCheckbox = document.getElementById('mostrarContrasena');


mostrarContrasenaCheckbox.addEventListener('change', function() {
  if (mostrarContrasenaCheckbox.checked) {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
});

// Escuchar el evento submit del formulario para crear la cuenta de usuario:
formRegistro.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener valores de los campos:
    const nombre = document.getElementById("name").value;
    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Obtener usuarios del almacenamiento local o inicializar un array vacío:
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Comprobar si el correo electrónico ya está registrado:
    const usuarioExistente = usuarios.find((user) => user.correo === correo);

    // Si el usuario ya existe, mostrar un mensaje y salir de la función:
    if (usuarioExistente) {
        // SweetAlert:
        
           alert("El correo electrónico ya está registrado. Por favor, utiliza otro.") ;
        return;
    }

    // Crear un nuevo usuario:
    const nuevoUsuario = new Usuario(nombre, correo, password);
    usuarios.push(nuevoUsuario); // Agregar el nuevo usuario al array de usuarios

    // Guardar el array actualizado en el almacenamiento local:
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Redireccionar a la página de inicio de sesión:
    window.location.href = "../index.html";
});

// Definir la clase Usuario:
class Usuario {
    constructor(nombre, correo, password) {
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
    }
}
