const express=require('express');
const bodyParser = require('body-parser')

const cors=require('cors');


const { ValidateLogin, VerifyLogin } = require('./validate');
const { SelectUser, ListE} = require('./select');

let app=express();
app.use(cors());    
app.use(bodyParser.urlencoded({ extends: false}));
app.use(bodyParser.json());

//rotas
app.post('/log', async(req,res)=>{
    //mostra oq veio dos inputs
    console.log('email: ' + req.body.tryEmail);
    console.log('senha: ' + req.body.tryPassword);
    //valida o login com uma função externa
    const use = await ValidateLogin(req.body.tryEmail, req.body.tryPassword);
    //verifica se existe
    if(use){
        //verifica qual é o tipo do usuario
        // console.log('olá, ' + use.nome);
        const verifyUser = await VerifyLogin(use.id);
        if(verifyUser){
            if(verifyUser === 1){
                console.log('motorista');
                res.send({
                    id: use.id,
                    tipo: 'motorista'
                  });
            }else if(verifyUser === 2){
                // console.log('passageiro');
                res.send({
                    id: use.id,
                    tipo: 'passageiro'
                  });
            }
        }
    }else{
        res.send({
            error: "usuário não encontrado"
          });
    }
});


app.post('/user', async(req,res) =>{
     console.log(req.body.id);
     const user = await SelectUser(req.body.id);
    //  console.log(user);
     res.send({  
        email: user.email, nome: user.nome
    });
});

app.post('/equipe', async(req, res) =>{
    const results = await ListE(); //array com os email e nomes dos alunos
    res.json({ results }); // Envia a resposta como JSON

})

//start server
let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{

    console.log('Servidor ok, sua porta é ' + port)
})

// let port = process.env.PORT || 3000;
// app.listen(port, async () => {

//     try {
//         const results = await ListE(1);
//         if (Array.isArray(results)) {
//             // Itera sobre os resultados se for um array
//             results.forEach(item => {
//                 console.log(item);
//                 // console.log(`Nome: ${item.useNome} --- Email: ${item.useEmail}`);
//             });
//         }

//     } catch (error) {
//         console.error('Erro ao executar a consulta:', error);
//     }


//     console.log('Servidor ok ' + port)
// })