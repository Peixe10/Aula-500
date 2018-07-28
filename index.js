/*Instruções:

1 - Executar o programa no CMD --> nodemon index.js
2 - Abrir o programa Postman 
3 - Em POST usar localhost:3000/cadastrar
4 - Em GET usar localhost:3000/emails
5 - Em POST digitar no body 
{
	"nome": "jose@uol",
	"email":"jose@email.com"
}

*/

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const cadastros = {};

app.get('/emails', (req, res) => {
    res.send(cadastros);
});

//Agora quero pegar um email especifico
//Ex: /email/:nome --> cria com dois pontos pois nome é uma variável e pode ter qualquer valor

app.get("/email/:nome", (req,res) => {
    let email = cadastros[req.params.nome];

    if(!email){
        return res.status(404).send({mensagem: `Lamentamos, mas não encontramos ${req.params.nome}.`})
    }

    res.send({'email': email});
});

app.post("/cadastrar", (req,res) => {

    if(!req.body.nome || !req.body.email){
        return res.status(400).send({mensagem: "Nome e email são obrigatórios"});
    }

    cadastros[req.body.nome]=req.body.email; //Cria em Objeto já que é JSON
    res.send({mensagem:"Cadastro realizado com sucesso!"}); //Nessa linha e na de cima o usuário só esta enviando a informação, e na teceira ele está  efetivamente entrando no sistema
    
});

app.listen(3000,() => console.log("Aplicação iniciada."));