const Sequelize = require('sequelize');
const sequelize = require('../db/index'); // Importa a instância de sequelize diretamente

const tblUsers = require('./tblUsers');
const tblPassageiro = require('./tblPassageiro');
const tblMotorista = require('./tblMotorista');
const tblContratante = require('./tblContratante');
const tblEndereco = require('./tblEndereco');
const tblEquipes = require('./tblEquipes');
const tblTurno = require('./tblTurno');
const tblPresenca = require('./tblPresenca');
const tblVan = require('./tblVan');

const Models = {
    tblUsers,
    tblPassageiro,
    tblMotorista,
    tblContratante,
    tblEndereco,
    tblEquipes,
    tblTurno,
    tblPresenca,
    tblVan,
}

// console.log(Models);

module.exports = Models;

