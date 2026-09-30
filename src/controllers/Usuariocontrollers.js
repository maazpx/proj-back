const bcrypt = require('bcrypt'); //importando biblioteca
const Usuario = require('../models/Usuario');

async function cadastrar(req, res) { //função de cadastro
    try {
        const {nome, email, senha, tipo} = req.body; //buscando no body os dados necessarios

        const senhaCriptografada = await bcrypt.hash(senha, 10); //criptografando a senha, embaralhando ela 10 vezes(formato padrao)

        const usuario = await Usuario.create({ //criando a tabela usuaio para receber os dados
            nome,
            email,
            senha: senhaCriptografada,
            tipo,
        });

        res.status(201).json({ //transformando os dados fornecidos em formato json
            usuario_id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar usuário',
            erro: erro.message,
        });
    }
}

module.exports = { cadastrar};