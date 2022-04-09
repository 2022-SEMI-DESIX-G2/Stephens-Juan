window.onload = function(){
    document.getElementById("P_1").innerHTML = '¿Qué es Javascript?';
    document.getElementById("P_2").innerHTML = '¿En qué se asemeja a Java?';

    document.getElementById("R_1").innerHTML = 'R. JavaScript es un lenguaje de programación o de secuencias de comandos que te permite implementar funciones complejas en páginas web, cada vez que una página web hace algo más que sentarse allí y mostrar información estática para que la veas, muestra oportunas actualizaciones de contenido, mapas interactivos, animación de Gráficos 2D/3D, desplazamiento de máquinas reproductoras de vídeo, etc., puedes apostar que probablemente JavaScript está involucrado.';
    document.getElementById("R_2").innerHTML = 'R. Mientras Java esta diseñado para propósitos generales de desarrollo, como software y páginas web; JavaScript está diseñado para un propósito específico, como es el desarrollo web principalmente, aunque también puede usarse para el desarrollo de aplicaciones.';
}

var num1 = 5;
var num2 = 9;
if(!isNaN(num1) && !isNaN(num2)){
console.log('El resultado de la suma es: ' + (num1 + num2));
console.log('El resultado de la resta es: ' + (num1 - num2));
console.log('El resultado de la multiplicación es: ' + (num1 * num2));
console.log('El resultado de la división: ' + (num1 / num2));
}

let cadena1 = 'Arroz con';
let cadena2 = 'pollo';
console.log(cadena1 + '' + cadena2); //por si las variables son de tipo númerico.

const constantino = ['arroz','pollo','ensalada de papa'];
console.log(typeof(constantino));

let obj = {
    num1: 9,
    cadena1: "Dinosaurio",
    cierto: true,
    dinero: {}
};
