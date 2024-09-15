const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente

const tblVan = sequelize.define('tblVan', {
  vanId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vanModelo: {
    type: Sequelize.STRING
  },
  vanPlaca: {
    type: Sequelize.STRING
  },
  vanCapacidade: {
    type: Sequelize.INTEGER
  },
  motId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblMotorista',
      key: 'motId'
    }
  },
  vanFoto: {
    type: Sequelize.BLOB
  }
}, {
  timestamps: false
});

module.exports = tblVan;