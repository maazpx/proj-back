const Movimentacao = require('../models/Movimentacao');
const Livro = require('../models/Livro');

async function cadastrar(req, res) {
  try {
    const { livro_id, tipo, quantidade } = req.body;

    // ID do usuário que veio do token
    const usuario_id = req.usuario?.usuario_id;

    console.log('Usuário autenticado:', req.usuario);
    console.log('ID do usuário:', usuario_id);

    if (!usuario_id) {
      return res.status(401).json({
        mensagem: 'Usuário não identificado no token',
      });
    }

    const livro = await Livro.findByPk(livro_id);

    if (!livro) {
      return res.status(404).json({
        mensagem: 'Livro não encontrado',
      });
    }

    if (tipo === 'saida' && livro.quantidade_estoque < quantidade) {
      return res.status(400).json({
        mensagem: 'Quantidade insuficiente em estoque',
      });
    }

    const novaQuantidade =
      tipo === 'entrada'
        ? livro.quantidade_estoque + quantidade
        : livro.quantidade_estoque - quantidade;

    await livro.update({
      quantidade_estoque: novaQuantidade,
    });

    const movimentacao = await Movimentacao.create({
      livro_id,
      tipo,
      quantidade,
      usuario_id,
    });

    res.status(201).json(movimentacao);

  } catch (erro) {
    res.status(400).json({
      mensagem: 'Erro ao cadastrar movimentação',
      erro: erro.message,
    });
  }
}

module.exports = { cadastrar };