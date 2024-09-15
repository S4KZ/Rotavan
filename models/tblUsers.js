const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente

const tblUsers = sequelize.define('tblUsers', {
  useId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  useEmail: {
    type: Sequelize.STRING
  },
  useSenha: {
    type: Sequelize.STRING
  },
  useNome: {
    type: Sequelize.STRING
  },
  useFoto: {
    type: Sequelize.BLOB
  }
}, {
  timestamps: false // Desativa createdAt e updatedAt
});

module.exports = tblUsers;
