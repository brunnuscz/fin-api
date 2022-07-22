const express = require('express');
// para renomear usa os : e o novo nome
const { v4: uuidv4 } = require('uuid'); // o v4 vai gerar o id com números randomicos

const app = express();

app.use(express.json());

// o array zero no reload
const customers = []

/**
 * cpf - string
 * name - string
 * id - uuid (Universal Unique Identifiers, Identificador Universal)
 * statement - []
 */

// criar uma conta
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    // o some é uma busca e ele retorna true ou false de acordo com a condição
    // os três iguais vai compara o tipo da variavel e se o valor é igual
    const customersAlreadyExists = customers.some(
        (customers) => customers.cpf === cpf
    );
    // se for true isso quer dizer que cpf já existe
    if(customersAlreadyExists){
        return response.status(400).json({error: "Customer already exists!"});
    }

    // criar um banco de dados "fake"
    customers.push({
        cpf,
        name,
        id: uuidv4(), // vai gerar o id,
        statement: []
    });
    return response.status(201).send(); // 201 - quando dado é criado
});

app.listen(3333, () => {
    console.log("Servidor rodando na posta 3333");
});