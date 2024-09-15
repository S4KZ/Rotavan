const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente

const tblPresenca = sequelize.define('tblPresenca', {
  preId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  preIdPas: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblPassageiro',
      key: 'pasId'
    }
  },
  prePartida: {
    type: Sequelize.BOOLEAN
  },
  preVolta: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false
});

module.exports = tblPresenca;