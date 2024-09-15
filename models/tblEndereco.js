const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente

const tblEndereco = sequelize.define('tblEndereco', {
  endId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  endRua: {
    type: Sequelize.STRING
  },
  endCep: {
    type: Sequelize.STRING
  },
  endBairro: {
    type: Sequelize.STRING
  },
  endCidade: {
    type: Sequelize.STRING
  },
  endUf: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = tblEndereco;