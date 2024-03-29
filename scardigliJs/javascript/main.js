const productos = [
    {  
       id:1,
       nombre:"zapatillas",
       precio: "$ " + 1500,
       img: "./img/productos/zapatillas.jpg"
    },
    {
        id:2,
        nombre: "campera",
        precio: "$ " + 2000,
        img:"./img/productos/campera.jpg"
    },
    { 
        id:3, 
        nombre: "botas", 
        precio: "$ " + 5000, 
        img: "./img/productos/botas.jpg"
    },
    {
        id:4, 
        nombre: "celular", 
        precio: "$ "+ 3000, 
        img:"./img/productos/celular.jpg"
    },
    {
        id:5, 
        nombre: "bici", 
        precio: "$ " + 15000, 
        img:"./img/productos/bici.jpg"
    },
    {
        id:6, 
        nombre: "tv", 
        precio:"$ "+ 50000, 
        img:"./img/productos/tele.jpg"
    },
    {
        id:7, 
        nombre: "cafetera", 
        precio:"$ "+ 50000, 
        img:"./img/productos/cafetera.jpg"
    },
    {
        id:8, 
        nombre: "camara seguridad", 
        precio:"$ "+ 50000, 
        img:"./img/productos/camaraseguridad.jpg"
    },
    {
        id:9, 
        nombre: "microondas", 
        precio:"$ "+ 50000, 
        img:"./img/productos/microondas.jpg"
    },
    {
        id:10, 
        nombre: "auriculares", 
        precio:"$ "+ 50000, 
        img:"./img/productos/auriculares.jpg"
    },
    {
        id:11, 
        nombre: "auriculares gamer", 
        precio:"$ "+ 50000, 
        img:"./img/productos/auricularescable.jpg"
    },
    {
        id:12, 
        nombre: "parlante", 
        precio:"$ "+ 50000, 
        img:"./img/productos/parlante.jpg"
    },
    
];

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

// Renderizar todas las tarjetas de productos al cargar la página
for (const producto of productos) {
    const div= document.createElement(`div`);
    div.innerHTML = `<div class="card">
    <p>${producto.nombre}</p>
    <img src=${producto.img} alt="${producto.nombre}">
    <h3>${producto.precio}</h3>
    <button class="btnAgregar" id="${producto.id}">agregar</button>
   </div>`;
   listaProductos.append(div);
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
        });
    });
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
            alert('El carrito está vacío. Agrega productos para continuar.');
            event.preventDefault();
        }
    }

    function obtenerCarrito() {
        const carritoString = localStorage.getItem('productosAgregadosEnCarrito');
        return carritoString ? JSON.parse(carritoString) : [];
    }
});
