((Utils) => {
    const App = {
      htmlElements: {
        pokemonFinderForm: document.querySelector("#find_pokemon_form"),
        pokemonFinderSearchType: document.querySelector(
          "#find_pokemon_select_type"
        ),
        pokemonFinderInput: document.querySelector("#find_pokemon_input"),
        pokemonFinderClear: document.querySelector("#btn_clear_form_pokemon"),
        pokemonFinderOutputPokemon: document.querySelector("#div_card_results_pokemon"),
        pokemonFinderOutputAbility: document.querySelector("#div_card_results_ability"),
      },
      init: () => {
        App.htmlElements.pokemonFinderForm.addEventListener(
          "submit",
          App.handlers.pokemonFinderFormOnSubmit
        );
        App.htmlElements.pokemonFinderForm.addEventListener(
            "click",
            App.handlers.pokemonFinderFormOnClick
        );
      },
      handlers: {
        pokemonFinderFormOnSubmit: async (e) => {
          e.preventDefault();
  
          const query = App.htmlElements.pokemonFinderInput.value;
          const searchType = App.htmlElements.pokemonFinderSearchType.value;
          try {
            const response = await Utils.getPokemon({
              query,
              searchType,
            });
            const renderedTemplate = App.templates.render({
              searchType,
              response,
            });
            if(searchType == "pokemon"){
            App.htmlElements.pokemonFinderOutputPokemon.innerHTML = renderedTemplate;
            App.htmlElements.pokemonFinderOutputPokemon.style.display = 'block';
            }else{
            App.htmlElements.pokemonFinderOutputAbility.innerHTML = renderedTemplate;  
            App.htmlElements.pokemonFinderOutputAbility.style.display = 'block';  
            }
            App.htmlElements.pokemonFinderClear.style.display = ''; 
            App.htmlElements.pokemonFinderClear.style.float = 'left'; 
          } catch (error) {
            if(searchType == "pokemon"){
            App.htmlElements.pokemonFinderOutputPokemon.innerHTML = `<h1>${error}</h1>`;
            }else{
            App.htmlElements.pokemonFinderOutputAbility.innerHTML = `<h1>${error}</h1>`;
            }
          }
        },
        pokemonFinderFormOnClick: (e) => {
            if(e.target.id == "btn_clear_form_pokemon"){
            e.preventDefault();
            App.htmlElements.pokemonFinderOutputPokemon.innerHTML = "";
            App.htmlElements.pokemonFinderOutputPokemon.style.display = 'none';
            App.htmlElements.pokemonFinderOutputAbility.innerHTML = "";  
            App.htmlElements.pokemonFinderOutputAbility.style.display = 'none'; 
            App.htmlElements.pokemonFinderClear.style.display = 'none';
            App.htmlElements.pokemonFinderInput.value = "";
            }
        },
      },
      templates: {
        render: ({ searchType, response }) => {
          const renderMap = {
            imagen: App.templates.imagen,
            ability: App.templates.abilityCard,
            pokemon: App.templates.pokemonCard,
          };
          return renderMap[searchType]
            ? renderMap[searchType](response)
            : App.templates.errorCard();
        },
        errorCard: () => `<h1>There was an error</h1>`,
        pokemonCard: ({ id, name, weight, height, sprites }) => {
          return `<span class='.name_pokemon'>${name} (${id})<span>
                  <image src='${sprites.back_default}'>
                  <ul><li>Weight: ${weight}</li><li>Height: ${height}</li></ul>`;
        },
        abilityCard: ({ id, name, pokemon }) => {
          const pokemonList = pokemon.map(
            ({ pokemon, is_hidden }) =>
              `<li><a target="_blank" href="${pokemon.url}">${pokemon.name}${
                is_hidden ? " (Hidden)" : ""
              }</a></li>`
          );
          return `<h1>${name} (${id})</h1><ul>${pokemonList.join("")}</ul>`;
        },
      },
    };
    App.init();
  })(document.Utils);