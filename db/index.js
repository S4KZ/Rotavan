const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
});

module.exports = sequelize;


async function TesteConect() {
  try {
    await sequelize.authenticate();
    // console.log('conection xep');
  } catch (error) {
    console.log('conection não xep', error);
  }
}

TesteConect();


