const express=require('express');
const bodyParser = require('body-parser')

const cors=require('cors');


const { ValidateLogin, VerifyLogin } = require('./validate');
const { SelectUser} = require('./select');

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
})

//start server
let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor ok ' + port)
})