
const sequelize = require('../db/index');
// const tblUsers = require('../models/tblUsers');
const { tblUsers } = require('../models/model');
const { SelectPas, SelectMot } = require('./select');

// var prompt = require('prompt-sync')();
// const Models = require('./models/models');



// const email = 'moto@gmail.com';
// const email = 'user@gmail.com';
// const senha = '123456';
// const email = prompt('Digite seu Email: ');
// const senha = prompt('Digite sua Senha: ');

async function ValidateLogin(email, senha) {
    try {
        const use = await tblUsers.findOne({
            where: {
                useEmail: email,
                useSenha: senha,
            },
            attributes: ['useEmail', 'useSenha', 'useId', 'useNome'],
        });
        if (use) {
            const user = {
                id: use.useId,
                email: use.useEmail,
                senha: use.useSenha,
                nome: use.useNome,
            }
            // console.log(user);
            // VerifyLogin(user.id);
            return user;
        }else{
            console.log('Email ou Senha Invalidos');
            return null;
        }

    } catch (error) {
        console.error(error);
        return null; // ou return uma mensagem de erro, e.g. "Erro ao validar login"
      }
}

// ValidateLogin(email, senha);
module.exports={ ValidateLogin, VerifyLogin };

async function VerifyLogin(useId) {
    //chamas as variaveis das functions
    const userM = await SelectMot(useId);
    const userP = await SelectPas(useId);

    if (userM) {
        // console.log(userM);
        return 1;
    }
    else if (userP) {
        // console.log(userP);
        return 2;
    }else {
        console.log('Precisa finalizar cadastro');
        return null;
    }
}



// async function fetchUser() {
//   try {
//     const selecUser = await tblUsers.findOne({
//       where: {
//         useId: 1,
//       },
//       attributes: ['useId', 'useNome'],
//     });
//     console.log(selecUser);
//     console.log(selecUser.useNome);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//   }
// }

// fetchUser();
