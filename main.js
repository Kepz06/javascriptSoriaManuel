/* let edad = parseInt (prompt ("ingrese su edad"));
console.log(edad);

if (edad >= 18) {
    alert ("Eres mayor de edad");
    console.log("Eres mayor de edad");
} else {
    alert ("Eres menor de edad");
    console.log("Eres menor de edad");
} */


/* function sumaPrimerosNumeros(n) {
    let suma = 0;
    for (let i = 1; i <= n; i++) {
        suma += i;
    }
    return suma;
}

let numero;
do {
    numero = prompt("Ingrese un número mayor o igual a 1");
} while (numero < 1);

console.log(`La suma de los primeros ${numero} números naturales es ${sumaPrimerosNumeros(numero)}`); */



const Producto = function (nombre, importe, stock){

    this.nombre = nombre
    this.importe = importe
    this.stock = stock
}

let producto1 = new Producto("logitech",120000,15)
let producto2 = new Producto("hyperx",70000,30)
let producto3 = new Producto("razer",110000,20)
let producto4 = new Producto("amd",320000,40)
let producto5 = new Producto("nvidia",1200000,5)

const lista = [producto1,producto2,producto3,producto4,producto5]

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


function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(lista));
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
