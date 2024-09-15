const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente

const tblTurno = sequelize.define('tblTurno', {
  turId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  turPeriodo: {
    type: Sequelize.STRING
  },
  turHoraPartida: {
    type: Sequelize.TIME
  },
  turHoraVolta: {
    type: Sequelize.TIME
  },
  motId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblMotorista',
      key: 'motId'
    }
  }
}, {
  timestamps: false
});

module.exports = tblTurno;