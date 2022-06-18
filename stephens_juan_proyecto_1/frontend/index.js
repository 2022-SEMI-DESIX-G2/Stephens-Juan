(() => {
  const App = {
    config: {
      baseApiUrl: "http://localhost:3000/pokemon",
      baseApiUrlUbica: "http://localhost:3000/encounters",
      baseApiUrlEvolucion: "http://localhost:3000/evoluciones",
    },
    htmlElements: {
      form: document.querySelector("#pokemon-form"),
      input: document.querySelector("#pokemon-input"),
      acc: document.getElementsByClassName("accordion"),
      spriteCheck: document.querySelector("#sprite-check"),
      ubicacionCheck: document.querySelector("#ubicacion-check"),
      evolucionCheck: document.querySelector("#evolucion-check"),
      divgeneral: document.querySelector("#div-general"),
      divsprite: document.querySelector("#div-sprite"),
      divubicacion: document.querySelector("#div-ubicacion"),
      divevolucion: document.querySelector("#div-evolucion"),
    },
    init: () => {
      App.htmlElements.form.addEventListener(
        "submit",
        App.handlers.handleFormSubmit
      );
      for (let i = 0; i < App.htmlElements.acc.length; i++) {
        App.htmlElements.acc[i].addEventListener("click", function () {
          this.classList.toggle("active");

          let panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
    },
    handlers: {
      handleFormSubmit: async (e) => {
        e.preventDefault();
        const pokemon = App.htmlElements.input.value.toLowerCase();
        const url = App.utils.getUrlPokemon({ pokemon });
        try {
          const { data } = await axios.post(url);
          const renderedTemplateGeneral = await App.templates.render({
            data,
            type: "general",
          });
          const renderedTemplateSprite = await App.templates.render({
            data,
            type: "sprite",
          });
          const renderedTemplateUbica = App.htmlElements.ubicacionCheck.checked
            ? await App.templates.render({
                data,
                type: "ubicacion",
              })
            : null;
          const renderedTemplateEvol = App.htmlElements.evolucionCheck.checked
            ? await App.templates.render({
                data,
                type: "evolucion",
              })
            : null;
          App.htmlElements.divgeneral.innerHTML = renderedTemplateGeneral;
          App.htmlElements.divsprite.innerHTML = App.htmlElements.spriteCheck
            .checked
            ? renderedTemplateSprite
            : "";
          App.htmlElements.divubicacion.innerHTML = App.htmlElements
            .ubicacionCheck.checked
            ? renderedTemplateUbica
            : "";
          App.htmlElements.divevolucion.innerHTML = App.htmlElements
            .evolucionCheck.checked
            ? renderedTemplateEvol
            : "";
        } catch (error) {
          //App.htmlElements.general.innerHTML = `<h1>${error}</h1>`;
          console.log(`Error: ${error}`);
        }
      },
    },
    templates: {
      render: async ({ data, type }) => {
        const renderMap = {
          general: App.templates.generalCard,
          sprite: App.templates.spriteCard,
          ubicacion: App.templates.ubicacionCard,
          evolucion: App.templates.evolucionCard,
        };
        return renderMap[type]
          ? await renderMap[type](data.data)
          : App.templates.errorCard();
      },
      generalCard: async ({
        id,
        name,
        weight,
        height,
        sprites,
        abilities,
        species,
      }) => {
        const image = `<image class='imagen_pokemon' src='${sprites.back_default}'>
                       <image class='imagen_pokemon' src='${sprites.front_default}'>`;
        const altura = `${weight} / ${height}`;
        const pokemonAbilitys = App.templates.pokemonAbilitys({ abilities });
        return `<div><b>${name.toUpperCase()} (${id})</b></div>
                <div class='grid-container'>
                <div><div>Apariencia<br></div><div>${image}</div></div>
                <div><div>Ancho / Alto</div><br><div>${altura}</div></div>
                <div><div>Habilidades</div><div>${pokemonAbilitys}</div></div>
                </div>`;
      },
      spriteCard: async ({ sprites }) => {
        const imageback = `<image class='imagen_pokemon' src='${sprites.back_default}'>
                       <image class='imagen_pokemon' src='${sprites.back_female}'>
                       <image class='imagen_pokemon' src='${sprites.back_shiny}'>
                       <image class='imagen_pokemon' src='${sprites.back_shiny_female}'>`;
        const imagefront = `<image class='imagen_pokemon' src='${sprites.front_default}'>
                       <image class='imagen_pokemon' src='${sprites.front_female}'>
                       <image class='imagen_pokemon' src='${sprites.front_shiny}'>
                       <image class='imagen_pokemon' src='${sprites.front_shiny_female}'>`;
        return `<div class='grid-container2'>
                <div><div>De Frente</div><br><div>${imagefront}</div></div>
                <div><div>De Espalda</div><br><div>${imageback}</div></div>
                </div>`;
      },
      ubicacionCard: async ({ name, location_area_encounters }) => {
        try {
          const url = App.utils.getUrlUbicacion();
          const { data } = await axios.post(url, {
            pokemon: name,
            url: location_area_encounters,
          });
          const pokemonEncounters = data.data.map(
            ({ location_area, version_details }) =>
              `<li class=''>${location_area.name}</li>`
          );
          return `<ul>${pokemonEncounters.join("")}</ul>`;
        } catch (error) {
          return `Error: ${error}`;
        }
      },
      evolucionCard: async ({ species, name }) => {
        const url = App.utils.getUrlEvolucion();
        const {data} = await axios.post(url, {
          url: species.url,
          pokemon: name,
        });
        const pokemonEvolvesList = data.map(
          ({ name, isbaby }) => `<li class='parrafo_card'>${name}</li>`
        );
        return `<ul>${pokemonEvolvesList.join("")}</ul>`;
      },
      pokemonAbilitys: ({ abilities }) => {
        const pokemonAbilitiesList = abilities.map(
          ({ ability, is_hidden }) =>
            `<li class='parrafo_card'>${ability.name}</li>`
        );
        return `<ul>${pokemonAbilitiesList.join("")}</ul>`;
      },
      errorCard: () => `<h1>¡Ups algo salio mal!</h1>`,
    },
    utils: {
      getUrlPokemon: ({ pokemon }) => {
        return `${App.config.baseApiUrl}/${pokemon}`;
      },
      getUrlUbicacion: () => {
        return `${App.config.baseApiUrlUbica}`;
      },
      getUrlEvolucion: () => {
        return `${App.config.baseApiUrlEvolucion}`;
      },
    },
  };
  App.init();
})();
