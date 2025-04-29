class Producto {
    constructor(nombre, importe, stock) {
        this.nombre = nombre;
        this.importe = importe;
        this.stock = stock;
    }
}

let lista = [];

async function cargarProductosDesdeAPI() {
    try {
        const response = await fetch('https://api.mocki.io/v1/example-endpoint'); // Cambia esto por la URL correcta
        if (!response.ok) throw new Error('Error al cargar datos desde la API');
        const data = await response.json();
        lista = data.map(prod => new Producto(prod.nombre, prod.importe, prod.stock));
        mostrarProductos();
    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo cargar los productos desde la API.', 'error');
    }
}



function filtrarProductos(){
    let palabraClave = prompt("ingresa el producto que buscas").trim().toUpperCase()
    let resultado = lista.filter( (x)=> x.nombre.toUpperCase().includes(palabraClave)  )

    if(resultado.length >0){ 
        console.table(resultado)
    }else{
        alert("no se encontraron coincidencias en la base")
    }
}


function agregarProducto(){

    let nombre = prompt("ingresa el nombre del producto").trim();
    let importe = parseFloat(prompt("ingresa el precio del producto"));
    let stock = parseInt(prompt("ingresa el stock del producto"))

    if(isNaN(importe) || isNaN(stock) || nombre === ""){
    alert("por favor ingrese datos validos")
    return;
    }

    let producto = new Producto(nombre,importe,stock)
    lista.push(producto)
    console.table(lista)
}


function cargarProductos() {
    const productosGuardados = JSON.parse(localStorage.getItem('productos'));
    if (productosGuardados) {
        lista.length = 0; 
        productosGuardados.forEach(prod => lista.push(new Producto(prod.nombre, prod.importe, prod.stock)));
    }
}
cargarProductos(); 


function mostrarProductos() {
    const contenedor = document.getElementById('productos-contenedor');
    contenedor.innerHTML = ''; 
    if (lista.length === 0) { 
        contenedor.innerHTML = '<p>No quedan productos disponibles.</p>';
        return; 
    }
    lista.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: ${producto.importe.toLocaleString('es-AR')}</p>
            <p>Stock: ${producto.stock}</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

function eliminarProducto(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás deshacer esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            lista.splice(index, 1);
            guardarProductos();
            mostrarProductos();
            Swal.fire(
                '¡Eliminado!',
                'El producto ha sido eliminado exitosamente.',
                'success'
            );
        }
    });
}


document.getElementById('filtrar-btn').addEventListener('click', () => {
    const palabraClave = document.getElementById('buscar-producto').value.trim().toUpperCase();
    const resultado = lista.filter(x => x.nombre.toUpperCase().includes(palabraClave));
    if (resultado.length > 0) {
        console.table(resultado); 
    } else {
        alert("No se encontraron coincidencias en la base");
    }
});


document.getElementById('agregar-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre-producto').value.trim();
    const precio = parseFloat(document.getElementById('precio-producto').value);
    const stock = parseInt(document.getElementById('stock-producto').value);
    
    if (isNaN(precio) || isNaN(stock) || nombre === "") {
        alert("Por favor ingresa datos válidos");
        return;
    }

    const nuevoProducto = new Producto(nombre, precio, stock);
    lista.push(nuevoProducto);
    guardarProductos();
    mostrarProductos();
});

function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(lista));
}