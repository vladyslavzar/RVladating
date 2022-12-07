import express from 'express';
import RegRouter from "./register/register.js";
import database from '../../database/database.js';

const UsersRouter = express.Router();

UsersRouter.use("/register", RegRouter);

UsersRouter.get("/finished/:email", async (req, res) => {
    try {
        const user = await database.findUser({email: req.params.email});
        if (!user) {
            res.status(404).json({message: "user with this email does not exist"});
            return;
        }

        const resMessage = user.finished ? "user finished registration" : "user did not finish registration";

        res.json({message: resMessage, finished: user.finished});
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

UsersRouter.get("/getStep/:email", async (req, res) => {
    try {
        const user = await database.findUser({email: req.params.email});
        if (!user) {
            res.status(404).json({message: "user with this email does not exist"});
            return;
        }

        if (user.finished) {
            res.status(403).json({message: "user already completed registration"});
            return;
        }

        res.json({step: user.step});
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

export default UsersRouter;
