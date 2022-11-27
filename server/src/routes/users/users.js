import express from 'express';
import RegRouter from "./register/register.js";

const UsersRouter = express.Router();

UsersRouter.use("/register", RegRouter);

export default UsersRouter;
