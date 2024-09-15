const Sequelize = require('sequelize');
const sequelize = require('../db'); // Importa a instância de sequelize diretamente

const tblPassageiro = sequelize.define('tblPassageiro', {
  pasId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pasTelefone: {
    type: Sequelize.INTEGER
  },
  pasIdEquipe: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblEquipes',
      key: 'equId'
    }
  },
  useId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblUsers',
      key: 'useId'
    }
  },
  pasEmbarque: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblEndereco',
      key: 'endId'
    }
  },
  pasDesembarque: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tblEndereco',
      key: 'endId'
    }
  }
}, {
  timestamps: false, // Desativa createdAt e updatedAt, se não desejar usar
  tableName: 'tblPassageiro' // Adiciona nome, caso de conflito de nome
});

module.exports = tblPassageiro;
