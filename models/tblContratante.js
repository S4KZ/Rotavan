const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente

const tblContratante = sequelize.define('tblContratante', {
  conId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  conNome: {
    type: Sequelize.STRING
  },
  conTelefone: {
    type: Sequelize.STRING
  },
  useId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblUsers',
      key: 'useId'
    }
  },
  idMotorista: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblMotorista',
      key: 'motId'
    }
  }
}, {
  timestamps: false
});

module.exports = tblContratante;