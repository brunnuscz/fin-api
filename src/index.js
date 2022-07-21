const express = require('express');

const app = express();

app.get('/', (request, response) => {
   return response.send("Olá!");
});

app.listen(3333, ()=>{
    console.log("Servidor rodando na posta 3333");
})