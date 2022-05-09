((Utils) => {
    const App = {
        htmlElements: {
            form: document.querySelector('#f_fibonacci'),
            input: document.querySelector('#valor'),
            response: document.querySelector('#d_card')
        },
        init: () => {
            App.htmlElements.form.addEventListener('submit', App.handlers.onFormSubmit);
            App.htmlElements.response.addEventListener('click', App.handlers.onCardClick);
        },
        utils: {
            ...Utils.methods,
        },
        templates: {
            card: (n) => {
                return `<div class="card">
                        <button class="btn_elim">X</button>
                        <span>${n}</span>
                        </div>`;
            }
        },
        handlers: {
            onCardClick: (e) => {
                if (e.target.className === 'btn_elim') {
                    let a = confirm("¿Desea eliminar la tarjeta?");
                    if (a) {
                        e.target.parentElement.remove();
                    }
                }
            },
            onFormSubmit: (e) => {
                e.preventDefault();

                App.htmlElements.response.innerHTML = '';
                if (App.utils.validaNumber(n)) {
                    const n = App.htmlElements.input.value;
                    App.utils.fibonacci(n).forEach(value => {
                        App.htmlElements.response.innerHTML += App.templates.card(value);
                    });
                } else {
                    alert("¡El valor introducido no es númerico!");
                }
            }
        }
    };
    App.init();
})(document.Utils);