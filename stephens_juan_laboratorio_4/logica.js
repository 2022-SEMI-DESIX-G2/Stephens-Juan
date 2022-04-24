window.onload = function() {  
    function eliminaCard() {
        let a = confirm("¿Desea eliminar la tarjeta?");
        if(a){
            this.parentNode.remove();
        }
    };  

    function mostrarBoton(id) {
        this.childNodes[0].classList.remove("esconder");
    }; 

    function esconderBoton(id){
        this.childNodes[0].classList.add("esconder");
    }

    function removeAllCards(){
        cards = document.getElementById("d_card").childNodes;
        cards.forEach(element => {
            element.remove();
        });
    }

        const EnviarDatos = function() {
           event.preventDefault();
           let num;
           let tot = 0, num1 = 0, num2 = 1;
           let x = 0;
           
           //removeAllCards();
           num = document.getElementById("valor").value;
           if(isNaN(num) || "" == num){
            document.getElementById("valor").value = "";
            alert("¡El valor introducido no es númerico!");
           }else{
               
               if(num > 0){
                const div_car0 = document.getElementById("d_card");
                const new_card0 = document.createElement("div");
                const new_span0 = document.createElement("span");
                const new_button0 = document.createElement("button");
                new_button0.innerText = "X";
                new_button0.classList.add("btn_elim");
                new_button0.classList.add("esconder");
                new_button0.id = "boton_0";
                new_button0.addEventListener("click", eliminaCard);
                new_card0.classList.add("card");

                new_span0.innerHTML = 0;
                new_card0.append(new_button0);
                new_card0.addEventListener("mouseover", mostrarBoton);
                new_card0.addEventListener("mouseout", esconderBoton);
                new_card0.appendChild(new_span0);
                div_car0.appendChild(new_card0);
               }
               while (tot < num) {
                x = x +1;
                const div_car = document.getElementById("d_card");
                const new_card = document.createElement("div");
                const new_span = document.createElement("span");
                const new_button = document.createElement("button");
                new_button.innerText = "X";
                new_button.id = "boton_"+x;
                new_button.classList.add("btn_elim");
                new_button.classList.add("esconder");
                new_button.addEventListener("click", eliminaCard);

                   new_card.classList.add("card");
                   tot = num1 + num2;
                   new_span.innerHTML = num2;
                   new_card.append(new_button);
                   new_card.addEventListener("mouseover", mostrarBoton);
                   new_card.addEventListener("mouseout", esconderBoton);
                   new_card.appendChild(new_span);
                   div_car.appendChild(new_card);
                   num1 = num2;
                   num2 = tot;
               }
           }
        };
        const form1 = document.getElementById("form1");
        form1.addEventListener("submit", EnviarDatos, false);
    };
  
