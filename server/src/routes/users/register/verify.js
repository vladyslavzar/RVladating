import express from 'express';
import database from "../../../database/database.js";

const RegVerifyRouter = express.Router();

RegVerifyRouter.post("/", async (req, res) => {
    try {
        const user = await database.findUser({email: req.body.email});
        if (!user) {
           res.status(404).json({message: "user with this email does not exist"});
        }

        const token = await database.findToken({id: user._id, token: req.body.code});
        if (!token) {
            return res.status(400).json({message: "invalid or expired code"});
        }

        await database.updateUser({id: user._id, verified: true});
        await token.remove();
        await database.updateUser({id: user._id, step: 3});

        res.json({message: "successfully verified user"});
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

RegVerifyRouter.get("/:id/:token", async (req, res) => {
    try {
        const user = await database.findUser({_id: req.params.id});

        if (user) {
            const token = await database.findToken({id: user._id, token: req.params.token});
            if (!token) 
                return res.status(400).json({message: "invalid or expired link"});

            await database.updateUser({id: user._id, verified: true});
            await token.remove();
            await database.updateUser({id: user._id, step: 3});

            res.redirect("http://localhost:3000");
        }
        else {
            return res.status(400).json({message: "invalid or expired link"});
        }
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

RegVerifyRouter.get("/:email", async (req, res) => {
    try {
        const user = await database.findUser({email: req.params.email});
        if (!user)
            return res.status(404).json({message: "user cannot be found"});

        if (user.verified) {
            res.json({message: "user is verified"});
        }
        else {
            res.json({message: "user is not verified"});
        }
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

export default RegVerifyRouter;
