const { Router } = require('express');
const router = Router();

const { getEncounters } = require('../controllers/encounter.controller.js');

router.route('/')
    .get(getEncounters);

module.exports = router;
