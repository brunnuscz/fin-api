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

// middlewares é aquilo que ta no meio, é como se fosse uma função entre o request e o response
function verifyExistsAccountCPF(request, response, next) { // o next define se vai pra frente ou vai parar onde tá
    // desestruturando
    const { cpf } = request.headers; // passando valor no header no insomnia
    // o cliente e dentro do cliente buscar o statement
    const customer = customers.find( // o find retorna todos os dados
        customer => customer.cpf === cpf
    );
    // verificar se não tem nenhum cpf
    // quando o objeto não tiver preenchido
    if (!customer) { // ! significa que ta negando
        return response.status(400).json({ error: "Customer not found!" });
    }
    // passando o obj que vai ser repassado
    request.customer = customer;

    return next();
}

// criar uma conta
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    // o some é uma busca e ele retorna true ou false de acordo com a condição
    // os três iguais vai compara o tipo da variavel e se o valor é igual
    const customersAlreadyExists = customers.some(
        (customers) => customers.cpf === cpf
    );
    // se for true isso quer dizer que cpf já existe
    if (customersAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists!" });
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

// buscar extrato bancario, cpf vai ser recebido pelo router params
// o middleware pode ser passado como segundo parâmetro ou
// app.use(verifyExistsAccountCPF); tem que ficar a cima dos que forem utilizar
app.get('/statement', verifyExistsAccountCPF, (request, response) => {
    const {customer} = request; // informação dentro do request
    return response.json(customer.statement);
});

// inserindo um deposito
app.post('/deposit', verifyExistsAccountCPF, (request, response)=>{
    const {description, amount} = request.body; // descrição e quantia
    const {customer} = request; // verificado se a conta é valida ou não
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }
    customer.statement.push(statementOperation); // inserindo o statement
    return response.status(201).send();
});


app.listen(3333, () => {
    console.log("Servidor rodando na posta 3333");
});