const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente

const tblEquipes  = sequelize.define('tblEquipes ', {
  equId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  equIdTurno: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblTurno',
      key: 'turId'
    }
  },
  motId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblMotorista',
      key: 'motId'
    }
  },
  equIdVan: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblVan',
      key: 'vanId'
    }
  }
}, {
  timestamps: false
});

module.exports = tblEquipes ;