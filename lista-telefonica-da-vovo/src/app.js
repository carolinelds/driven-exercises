import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import chalk from 'chalk';
dotenv.config();

const server = express();
server.use(cors());
server.use(json());

let database = null;
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
const promise = mongoClient.connect();

promise.then(response => {
  database = mongoClient.db("contatos");
  console.log(chalk.blue.bold("Banco de dados conectado com sucesso"));
})

promise.catch(err => {
  console.log(chalk.red.bold("Falha na conexão com o banco de dados", err));
});

server.get('/contatos', (req, res) => {

  const promise = database.collection("contatos").find().toArray();
  promise.then(contacts => {
    res.send(contacts);
  });
  promise.catch(err => {
    console.log(chalk.red.bold("Falha na obtenção dos contatos"), err);
    res.status(500).send("Não foi possível obter os contatos");
  });
});

server.post('/contatos', (req, res) => {
  if (!req.body.nome || !req.body.telefone) {
    res.status(422).send("Todos os campos são obrigatórios!");
    return;
  }

  const novoContato = req.body;

  const promise = database.collection("contatos").insertOne(novoContato);
  promise.then(response => {
    res.sendStatus(201);
  });
  promise.catch(err => {
    console.log(chalk.red.bold("Falha na adição de novo contato"), err);
    res.status(500).send("Falha inesperada na adição de novo contato");
  });

  
})

server.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});
