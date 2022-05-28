(() => {
    const Utils = {
      settings: {
        backendBaseUrl: "https://pokeapi.co/api/v2",
      },
      getFormattedBackendUrl: ({ query, searchType }) => {
        return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
      },
      getPokemon: ({ query, searchType = "pokemon" }) => {
        return Utils.fetch({
          url: Utils.getFormattedBackendUrl({ query, searchType }),
          searchType,
        });
      },
      getEvoluciones: async ({ species, searchType = "evoluciones" }) => {
        const specie = await Utils.getURLSpecies({species, searchType});
        
        const evoluciones = await Utils.fetch({
          url: specie.evolution_chain.url,
          searchType,
        });
        const listEvoluciones = Utils.getListEvoluciones(evoluciones.chain, []);
        
        return listEvoluciones;
      },
      getListEvoluciones: ({is_baby, species, evolves_to}, arrEvolutions) => {
        arrEvolutions.push({
          isbaby: is_baby,
          name: species.name
        });
        const detailEvolution = evolves_to.map(
          ({ is_baby, species, evolves_to }) => {
              Utils.getListEvoluciones({ is_baby, species, evolves_to }, arrEvolutions);
            }
         );
        return arrEvolutions;
      },
      getURLSpecies: ({ species, searchType }) => {
        return Utils.fetch({
          url: species.url,
          searchType,
        });
      },
      nameAbility: ({names}) => {
        let nameSpanish;
        const Names = names.map(
          ({language, name}) => {
          let idName = language.name;
          if(idName == "es"){
            nameSpanish = name;
          }
          });
          return nameSpanish;
      },
      fetch: async ({ url, searchType }) => {
        try {
          const rawResponse = await fetch(url);
          if (rawResponse.status !== 200) {
            throw new Error(`${searchType} not found`);
          }
          return rawResponse.json();
        } catch (error) {
          throw error;
        }
      },
    };
    document.Utils = Utils;
  })();