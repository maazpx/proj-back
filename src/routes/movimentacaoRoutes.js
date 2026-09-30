const express = require('express');

const router = express.Router();

const movimentacaoController = require('../controllers/movimentacaoController');
const auth = require('../middlewares/auth');

router.post(
    '/movimentacoes',
    auth,
    movimentacaoController.cadastrar
);

module.exports = router;
