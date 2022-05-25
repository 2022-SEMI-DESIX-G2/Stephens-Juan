const numero = "5";
let x = 0;
let tot = 0;
let num = 0;
let num1 = 0;
let num2 = 1;
let array = [0,1];

if(isNaN(numero) || "" == numero){
    console.log("¡El valor introducido no es númerico!");
   }else{
    if(numero > 0){
        while (tot < numero) {
            tot = num1 + num2;
            num1 = num2;
            array.push(tot);
            num2 = tot;
        }
        console.log(array.join(" "));
    }
   }