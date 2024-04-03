//PRODUCTOS PAGINA


let productos;


//Funcion para llamar al array 'tienda' de forma asincrona:
const getData = async (url) => {
    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      //desestructurar:
      productos = datos.productos; // productos tiene el array 
      //console.log(datos);

      renderizarTarjetasProductos(productos);
  
      agregarEventListeners(productos);
     
    } catch (error) {
      console.error("Error del servidor: ", error);

    }
  };
  
  const API_URL = "../db.json";
  getData(API_URL);


//ELEMENTOS

const listaProductos = document.getElementById("contenedorProductos");
const indexNumeroCarrito = document.getElementById("indexCarrito");
const btnSearch = document.querySelector (`#btnSearchJs`),
 inputSearch = document.querySelector (`#inputSearchJs`),
 contenedor = document.querySelector(`#contenedorSearch`);


// Función para filtrar los productos
function filtroProducto(arr, filtro){
    const filtrado = arr.filter((el) => {
        return el.nombre.toLowerCase().includes(filtro.toLowerCase());
    });
    return filtrado;
}

// Función para actualizar la lista de productos según el filtro de búsqueda
function actualizarListaProductos(filtrado) {
    listaProductos.innerHTML = "";
    filtrado.forEach(producto => {
        const div= document.createElement(`div`);
        div.innerHTML = `<div class="card">
        <p>${producto.nombre}</p>
        <img src=${producto.img} alt="${producto.nombre}">
        <h3>${producto.precio}</h3>
        <button class="btnAgregar" id="${producto.id}">agregar</button>
       </div>`;
       listaProductos.append(div);
    });

    agregarEventListeners();
}


// Función para renderizar las card
function renderizarTarjetasProductos() {
    for (const producto of productos) {
        const div = document.createElement('div');
        div.innerHTML = `<div class="card">
        <p>${producto.nombre}</p>
        <img src=${producto.img} alt="${producto.nombre}">
        <h3>$ ${producto.precio}</h3>
        <button class="btnAgregar" id="${producto.id}">agregar</button>
       </div>`;
        listaProductos.append(div);
    }
}

agregarEventListeners();


//evento
btnSearch.addEventListener(`click`, () => {
    const filtrado = filtroProducto(productos, inputSearch.value);
    actualizarListaProductos(filtrado);
});

contenedor.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const filtrado = filtroProducto(productos, inputSearch.value);
    actualizarListaProductos(filtrado);
});


function agregarEventListeners() {
    const btnAgregar = document.querySelectorAll('.btnAgregar');

    btnAgregar.forEach(function(boton) {
        boton.addEventListener('click', () => {
            const productoId = parseInt(boton.getAttribute('id'));
            const productoSeleccionado = productos.find(producto => producto.id === parseInt(productoId));
        
            const productoEnCarrito = agregadosCarrito.find(producto => producto.id === productoId);
            
           

            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
                
            } else {
                productoSeleccionado.cantidad = 1;
                agregadosCarrito.push(productoSeleccionado);
            }    
            
            actualizarCarritoIndex();
            localStorage.setItem("productosAgregadosEnCarrito", JSON.stringify(agregadosCarrito));
           
            Toastify({
                text: `${productoEnCarrito.nombre} se agregó al carrito!`,
                duration: 1500,
                position: "left",
                gravity: "top",
                stopOnFocus: true,
                destination: "../carrito.html",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
              actualizarCarritoIndex();
            

         
        });
    });
}

function animacionAgregado(){
    
}

//CONTADOR CARRITO
let agregadosCarrito;

const agregadosCarritoLs= JSON.parse(localStorage.getItem("productosAgregadosEnCarrito"));

if (agregadosCarritoLs){
    agregadosCarrito = agregadosCarritoLs;
    actualizarCarritoIndex();
}else{
    agregadosCarrito = [];
}


function actualizarCarritoIndex (){
    const cantidadTotal = agregadosCarrito.reduce ((total,producto)=> total + producto.cantidad,0);
    indexNumeroCarrito.textContent = cantidadTotal.toString();
}

//LIMITAR EL INGRESO AL CARRITO SI ESTA VACIO 
document.addEventListener('DOMContentLoaded', () => {
    
    const divCarrito = document.getElementById('divCarrito');
    
    divCarrito.addEventListener('click', verificarCarrito);

    function verificarCarrito(event) {
       
        const carrito = obtenerCarrito();
        if (carrito.length === 0) {
            Swal.fire({
                title: "COMPRA !",
                text: "tu carrito esta vacío",
                imageUrl: "../img/productos/OIP.jpg",
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: "abuela"
            });
            event.preventDefault();
          
        }
    }

    function obtenerCarrito() {
        const carritoString = localStorage.getItem('productosAgregadosEnCarrito');
        return carritoString ? JSON.parse(carritoString) : [];
    }
  
});

