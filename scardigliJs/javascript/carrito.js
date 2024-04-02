const productosEnCarrito = JSON.parse(localStorage.getItem("productosAgregadosEnCarrito"));

const contenedorCarrito = document.getElementById(`contenedorCarrito`);

if(productosEnCarrito){

    productosEnCarrito.forEach( producto =>{
        const div = document.createElement(`div`);
        div.classList.add(`cardCarrito`);
        div.id = `producto-${producto.id}`;
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.img}" alt="${producto.nombre}">
        <div class="producto-info">
            <h2 class="producto-nombre">${producto.nombre}</h2>
            <p class="producto-precio">$ ${producto.precio}</p>
            <div class="producto-cantidad">
                <span>Cantidad : ${producto.cantidad}</span>    
            </div>
        </div>
        <button class="eliminar-producto" id="${producto.id}">
             <i class="bi bi-trash3"></i>
        </button>
    </div>
      `;
      contenedorCarrito.append(div);
    })
    
}

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(id) {
    // Obtener el carrito del almacenamiento local
    let carrito = JSON.parse(localStorage.getItem("productosAgregadosEnCarrito")) || [];
    
    // Buscar el producto en el carrito por su ID
    const producto = carrito.find(producto => producto.id === id);
    
    if (producto) {  

        producto.cantidad--;

        if (producto.cantidad === 0) {
            
            carrito = carrito.filter(item => item.id !== id);
        }

        localStorage.setItem("productosAgregadosEnCarrito", JSON.stringify(carrito));

        const tarjetaProducto = document.getElementById(`producto-${id}`);
        if (tarjetaProducto) {
            tarjetaProducto.remove();
        }
        //Reducir el total 
        actualizarTotalCarrito(-producto.precio)

        // Actualizar 
        actualizarInterfazUsuario();
    }
}

// Función para actualizar la interfaz de usuario
function actualizarInterfazUsuario() {

    const contenedorCarrito = document.getElementById("contenedorCarrito");

    const carrito = JSON.parse(localStorage.getItem("productosAgregadosEnCarrito")) || [];

    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("cardCarrito");
        div.id = `producto-${producto.id}`;
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.img}" alt="${producto.nombre}">
            <div class="producto-info">
                <h2 class="producto-nombre">${producto.nombre}</h2>
                <p class="producto-precio">$ ${producto.precio}</p>
                <div class="producto-cantidad">
                    <span>Cantidad : ${producto.cantidad}</span>    
                </div>
            </div>
            <button class="eliminar-producto" id="${producto.id}">
                <i class="bi bi-trash3"></i>
            </button>
        `;
        contenedorCarrito.append(div);

        // Eliminar event
        div.querySelectorAll('.eliminar-producto').forEach(boton => {
            boton.removeEventListener('click', eliminarProductoDelCarrito);
        });

        // Agregar event 
        div.querySelectorAll('.eliminar-producto').forEach(boton => {
            boton.addEventListener('click', () => {
                const idProducto = parseInt(boton.getAttribute('id'));
                eliminarProductoDelCarrito(idProducto);
            });
        });
    });

    // Actualizar
    actualizarContadorCarrito(carrito.length);
}
function calcularTotalCarrito() {
    let total = 0;
    const carrito = JSON.parse(localStorage.getItem("productosAgregadosEnCarrito")) || [];
    
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    
    return total;
}

//funcion para actualizar total 
function actualizarTotalCarrito(valor) {
    let totalCarrito = parseFloat(document.querySelector('#totalCarrito span').textContent.replace('$ ', ''));
    totalCarrito += valor;
    document.querySelector('#totalCarrito span').textContent = `$ ${totalCarrito.toFixed(2)}`;
}


// Función para actualizar
function actualizarContadorCarrito(cantidad) {
    const contadorCarrito = document.getElementById("indexCarrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = cantidad.toString();
    }
}


// Evento 
document.addEventListener('DOMContentLoaded', () => {
    //console.log('El dom cargo');
    actualizarInterfazUsuario();
     // Actualizar el total del carrito
     const totalCarritoElement = document.querySelector('#totalCarrito span');
     if (totalCarritoElement) {
         totalCarritoElement.textContent = `$ ${calcularTotalCarrito()}`;
     }
});

//btn globales  
document.addEventListener('DOMContentLoaded', () => {
    const botonComprar = document.getElementById('comprar');
    const botonCancelarCompra = document.getElementById('cancelarCompra');

    botonComprar.addEventListener('click', () => {
        setTimeout(()=>{
            localStorage.setItem('productosAgregadosEnCarrito', JSON.stringify([]));
            window.location.href = 'productos.html'; 
        },3000);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Tu compra fue confirmada",
            showConfirmButton: false,
            timer: 3000
          });
         

    });

    botonCancelarCompra.addEventListener('click', () => {
        localStorage.setItem('productosAgregadosEnCarrito', JSON.stringify([]));
        
        window.location.href = 'productos.html'; 
    });
});

