import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
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
  const password = req.body.password;

  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    await db.collection("users").insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);

  } catch {
    res.sendStatus(500);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await db.collection("users").findOne({ email });
    if (usuario && bcrypt.compareSync(password, usuario.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({
        userId: usuario._id,
        token,
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }

  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/meus-dados", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) {
    res.sendStatus(401);
    return;
  }

  const session = await db.collections("sessions").findOne({ token });
  if (!session) {
    return res.sendStatus(401);
  }

  try {
    const usuario = await db.collection("users").findOne({
      _id: session.userId,
    });
    if (usuario) {
      delete usuario.password;

      res.status(201).send(user);
    }

  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000.");
});