import { Router } from 'express';
import { getUser, updateUser, deleteUser } from './../controllers/userController.js';

const userRouter = Router();

userRouter.get("/user", getUser);
userRouter.put("/user", updateUser);
userRouter.delete("/user", deleteUser);

export default userRouter;