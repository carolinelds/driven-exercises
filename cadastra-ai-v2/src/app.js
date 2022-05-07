import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("cadastra-ai-v2");
});

const app = express();
app.use(express.json());

app.post("/sign-up", async (req, res) => {
  //name, email, password
  const user = req.body;
  const senhaCriptografada = bcrypt.hashSync(user.password, 10);

  try {
    await db.collection("usuarios").insertOne({...user, password: senhaCriptografada});
    res.sendStatus(201);
  } catch(e) {
    res.sendStatus(500);
    console.log("Erro ao registrar", e);
  }

  res.sendStatus(201);
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await db.collection("usuarios").findOne({email: email});
    if (usuario && bcrypt.compareSync(password, usuario.password)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch(e) {
    res.sendStatus(500);
    console.log("Erro ao fazer login", e);
  }

  
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000.');
});
