const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente


const tblMotorista = sequelize.define('tblMotorista', {
  motId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  motTelefone: {
    type: Sequelize.STRING
  },
  motCnh: {
    type: Sequelize.STRING
  },
  motCpf: {
    type: Sequelize.INTEGER
  },
  useId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblUsers',
      key: 'useId'
    }
  },
}, {
  timestamps: false
});

module.exports = tblMotorista;