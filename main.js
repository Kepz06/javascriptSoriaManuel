let edad = prompt ("ingrese su edad");
console.log(edad);

if (edad >= 18) {
    alert ("Eres mayor de edad");
    console.log("Eres mayor de edad");
} else {
    alert ("Eres menor de edad");
    console.log("Eres menor de edad");
}


function sumaPrimerosNumeros(n) {
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

console.log(`La suma de los primeros ${numero} números naturales es ${sumaPrimerosNumeros(numero)}`);