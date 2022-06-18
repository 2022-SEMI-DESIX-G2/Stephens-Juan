require("dotenv").config();
const axios = require("axios").default;
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const CACHE = [];
const time = 20000;

app.use(cors());

//Aquí estamos configurando express para usar body-parser como middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/cache", async function (req, res) {
  res.json({ data: CACHE });
});

app.post("/pokemon/:name", async function (req, res) {
  const { name } = req.params;
  if (CACHE[name]) {
    return res.json({
      data: CACHE[name].general,
      isCached: CACHE[name].isCached,
    });
  }
  let responseData;
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    responseData = data;
  } catch (error) {
    responseData = { error: error.toString(), name };
  }
  CACHE[name] = {
    general: responseData,
    isCached: true,
    ubicacion: { isCached: false },
    evolucion: { isCached: false },
  };
  res.json({ data: responseData, isCached: false });
});

app.post("/encounters", async function (req, res) {
  const { pokemon, url } = req.body;
  let ubicacion = CACHE[pokemon].ubicacion;

  if (ubicacion.isCached) {
    return res.json({
      data: CACHE[pokemon].ubicacion.data,
      isCached: CACHE[pokemon].ubicacion.isCached,
    });
  }

  let responseData;
  try {
    const { data } = await axios.get(url);
    responseData = data;
  } catch (error) {
    responseData = { error: error.toString(), pokemon };
  }
  CACHE[pokemon].ubicacion = { data: responseData, isCached: true };
  res.json({ data: responseData, isCached: false });
});

app.post("/evoluciones", async function (req, res) {
  const { url, pokemon } = req.body;

  let evolucion = CACHE[pokemon].evolucion;

  if (evolucion.isCached) {
    return res.json({
      data: CACHE[pokemon].evolucion.data,
      isCached: CACHE[pokemon].evolucion.isCached,
    });
  }

  try {
    const { data } = await axios(url);
    const chain = await getUrlSpecie(data);
    const listEvoluciones = getListEvoluciones(chain, []);
    CACHE[pokemon].evolucion = { data: listEvoluciones, isCached: true };
    res.json(listEvoluciones);
  } catch (error) {
    listEvoluciones = { error: error.toString(), pokemon };
  }
  
});

const getUrlSpecie = async ({ evolution_chain }) => {
  const { data } = await axios(evolution_chain.url);
  return data.chain;
};

const getListEvoluciones = ({ species, evolves_to }, arrEvolutions) => {
  arrEvolutions.push({
    name: species.name,
  });
  const detailEvolution = evolves_to.map(({ species, evolves_to }) => {
    getListEvoluciones({ species, evolves_to }, arrEvolutions);
  });
  return arrEvolutions;
};

const formatearCache = () => {
  console.log(`CACHE LLENO ${CACHE}`);
  CACHE.splice(0);
  console.log(`CACHE VACIO ${CACHE}`);
  setTimeout(formatearCache, time);
};

setTimeout(formatearCache, time);


app.listen(PORT, () => {
  console.log(`El servidor está ejecutando en el puerto ${PORT}.`);
});
