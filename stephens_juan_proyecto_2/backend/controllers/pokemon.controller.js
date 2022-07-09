const axios = require("axios").default;
const Pokemon = require("../models/Pokemon");
const pokemonCtrl = {};

pokemonCtrl.getPokemon = async (req, res) => {
  //const cachePokemon = {};
  const { namePokemon } = req.params;

  try {
    let fechaActual = new Date();
    const cachePokemon = await Pokemon.find({ name: namePokemon });
    if (cachePokemon.length) {
      let responseCache = {};
      cachePokemon.map((cache) => {
        responseCache = {
          data: cache.general,
          isCached: cache.isCached,
          id: cache._id,
          updatedAt: cache.updatedAt,
        }
      });
      let diffFecha = fechaActual - responseCache.updatedAt;
      let diff = diffFecha / (1000 /* * 60 * 60 * 24 */);
      console.log(diff);
      if(diff > 30){
        const deletePokemon = await Pokemon.deleteOne({ _id: responseCache.id });
      }else{
      return res.json(responseCache);
      }
    }

    let responseData;
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
    );
    responseData = data;

    const newPokemon = new Pokemon({
      name: namePokemon,
      general: responseData,
      isCached: true,
    });
    await newPokemon.save();
    res.json({ data: responseData, isCached: false });
  } catch (error) {
    responseData = { error: error.toString(), namePokemon };
  }
};

module.exports = pokemonCtrl;
