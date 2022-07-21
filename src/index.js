const express = require('express');
// para renomear usa os : e o novo nome
const { v4: uuidv4 } = require('uuid'); // o v4 vai gerar o id com números randomicos

const app = express();

app.use(express.json());

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
    const id = uuidv4(); // vai gerar o id
    // criar um banco de dados "fake"
    customers.push({
        cpf,
        name,
        id,
        statement: []
    });
    return response.status(201).send(); // 201 - quando dado é criado
});

app.listen(3333, () => {
    console.log("Servidor rodando na posta 3333");
})