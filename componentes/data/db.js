const { Sequelize } = require("sequelize")

    const sequelize = new Sequelize('Rotavan', 'hubsap45_usrRotavan', 'R0t@vAn@20IV',  {
        host: 'br612.hostgator.com.br',
        dialect: 'mysql'
    });

    try {
        await sequelize.authenticate();
        console.log('Deu certo galera.');
      } catch (error) {
        console.error('Deu errado galera', error);
      }