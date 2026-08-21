const express = require('express');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(usuarioRoutes);
app.use(authRoutes);

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.error('Erro ao conectar:', err));

sequelize.sync();

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));