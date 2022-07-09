const { Router } = require('express');
const router = Router();

const { getPokemon } = require('../controllers/pokemon.controller.js');

router.route('/:namePokemon')
    .get(getPokemon);

module.exports = router;
