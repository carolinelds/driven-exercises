import express from 'express';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(express.json());

app.use(authRouter);

app.use(userRouter);

app.listen(5000, () => {
  console.log('Server is listening on port 5000.');
});
