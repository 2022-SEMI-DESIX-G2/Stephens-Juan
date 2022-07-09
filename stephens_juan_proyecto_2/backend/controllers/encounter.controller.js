const encounterCtrl = {};
const Pokemon = require("../models/Pokemon");

encounterCtrl.getEncounters = async (req, res) => {
  const cachePokemon = {};
  const { pokemon, url } = req.body;

  try {
    console.log(Pokemon);
    //filtrar por pokemon;
    cachePokemon = await Pokemon.find();
    console.log(cachePokemon);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }

  let ubicacion = cachePokemon[pokemon].ubicacion;

  if (ubicacion.isCached) {
    return res.json({
      data: cachePokemon[pokemon].ubicacion.data,
      isCached: cachePokemon[pokemon].ubicacion.isCached,
    });
  }

  let responseData;
  try {
    const { data } = await axios.get(url);
    responseData = data;
  } catch (error) {
    responseData = { error: error.toString(), pokemon };
  }
  cachePokemon[pokemon].ubicacion = { data: responseData, isCached: true };

  res.json({ data: responseData, isCached: false });
};

const findEncouter = async ({ name, location_area_encounters }) => {
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
}

module.exports = encounterCtrl;
