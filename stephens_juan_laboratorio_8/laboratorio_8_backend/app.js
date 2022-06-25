require("dotenv").config();
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

const CACHE = {};

app.use(cors());

app.get("/cache", async function (req, res) {
  res.json({ data: CACHE });
});

app.post("/pokemon/:name", async function (req, res) {
  const { name } = req.params;
  if (CACHE[name]) {
    return res.json({ data: CACHE[name], isCached: true });
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
  CACHE[name] = responseData;
  res.send({ data: responseData, isCached: false });
});

app.listen(PORT, () => {
  console.log(`El servidor está ejecutando en el puerto ${PORT}.`);
});