const { Sequelize } = require('sequelize'); // Importando Sequelize corretamente
const sequelize = require('../db/index');
const { tblUsers, tblPassageiro, tblMotorista, tblEquipes } = require('../models/model'); // Chama os models (tbl) declarados no models.js

async function SelectUser(useid) {
    try {
        const use = await tblUsers.findOne({
            where: {
                useId: useid
            },
        })
        if (use) {
            //console.log('pass xep');
            const user = {
                id: use.useId,
                email: use.useEmail,
                senha: use.useSenha,
                nome: use.useNome,
            };
            return user
        } else {
            //console.log('pass não xep');
            return null
        }

    } catch (error) {
        console.error('Erro no SelectUser:', error);
        return null;
    }
}



async function SelectPas(useid) { // Função para armazenar passageiro com o useId
    try {
        const pas = await tblPassageiro.findOne({
            where: {
                useId: useid
            },
        });

        if (pas) {
            // console.log('pass xep');
            const userP = {
                id: pas.pasId,
                telefone: pas.pasTelefone,
                equipe: pas.pasIdEquipe,
                useId: pas.useId,
                embarque: pas.pasEmbarque,
                desembarque: pas.pasDesembarque,
            };
            return userP;
        } else {
            // console.log('pass não xep');
            return null;
        }
    } catch (error) {
        console.error('Erro no SelectPas:', error);
        return null;
    }
}

async function SelectMot(useid) { // Função para armazenar motorista com o useId
    try {
        const mot = await tblMotorista.findOne({
            where: {
                useId: useid
            },
        });

        if (mot) {
            // console.log('mot xep');
            const UserM = {
                id: mot.motId,
                telefone: mot.motTelefone,
                cnh: mot.motCnh,
                Cpf: mot.motCpf,
                useId: mot.useId,
            };
            return UserM;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erro no SelectMot:', error);
        return null;
    }
}

// Função para listar passageiros da equipe
async function ListE(pasIdEquipe) {
    const row = `
        SELECT useId, useNome, useEmail, pasIdEquipe
        FROM hubsap45_bd_rotavan.tblUsers
        INNER JOIN hubsap45_bd_rotavan.tblPassageiro USING (useId)
        WHERE pasIdEquipe = :pasIdEquipe
    `;

    try {
        const results = await sequelize.query(row, {
            replacements: { pasIdEquipe },
            type: Sequelize.QueryTypes.SELECT
        });

       // console.log('Results:', results); //Imprima os resultados para ver a estrutura

        if (Array.isArray(results)) {
            // Itera sobre os resultados se for um array
            results.forEach(item => {
                console.log(`Nome: ${item.useNome} --- Email: ${item.useEmail}`);
            });
        } else {
            // Se não for um array, trate o resultado como um único objeto
            console.log(`Nome: ${results.useNome} --- Email: ${results.useEmail}`);
        }
    } catch (error) {
        console.error('Error executing query:', error);
    }
}


// ListE(1);






module.exports = { SelectUser, SelectMot, SelectPas, ListE };
