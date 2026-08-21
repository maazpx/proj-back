const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,},

    email: {
        type: DataTypes.STRING,  
        allowNull: false,
        unique: true,},

    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,},

    tipo: {
        type: DataTypes.ENUM('operador', 'administrador'),
        allowNull: false,},
    
});
module.exports= Usuario;