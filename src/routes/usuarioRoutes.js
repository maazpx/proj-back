const express = require('express');
const router = express.Router();
const {cadastrar} = require('../controllers/usuarioControllers')
router.post('/usuarios', cadastrar);

module.exports = router;