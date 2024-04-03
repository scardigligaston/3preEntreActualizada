// Función para iniciar sesión
function inicioSesion(usuarios) {
    const nombre = document.getElementById("name").value;
    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const usuarioEncontrado = usuarios.find((usuario) => {
      return (
        usuario.nombre === nombre &&
        usuario.correo === correo &&
        usuario.password === password
      );
    });
  
    if (usuarioEncontrado) {
      window.location.href = "../productos.html";
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Usuario no encontrado",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  const mostrarContrasenaCheckbox = document.getElementById('mostrarContrasena');

mostrarContrasenaCheckbox.addEventListener('change', function() {
  if (mostrarContrasenaCheckbox.checked) {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
});
  
  // Event listener para el formulario de inicio de sesión
  document.querySelector(".btnAcceder").addEventListener("click", () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    inicioSesion(usuarios);
  });
  
