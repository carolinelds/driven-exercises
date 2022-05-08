import express from 'express';
import cors from 'cors';
import { registerUser, loginUser } from './controllers/authController.js';
import { getUser, putUser, deleteUser } from './controllers/userController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", registerUser);

app.post("/sign-in", loginUser);

app.get("/user", getUser);

app.put("/user", putUser);

app.delete("/user", deleteUser);

app.listen(5000, () => {
  console.log('Server is listening on port 5000.');
});
