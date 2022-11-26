import express from 'express';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import sendMail from "./utils/sendMail.js";
import database from "./utils/database.js";
import { validateEmail, validatePassword } from "./utils/validate.js";

const RegRouter = express.Router();

const jsonParser = bodyParser.json({ extended: false });

RegRouter.post("/", jsonParser, async (req, res) => {
    try {
        const userData = req.body;
        const { validationError } = validateEmail(userData);
        
        if (validationError) {
            return res.status(400).json({message: validationError.details[0].message});
        }

        let user = await database.findUser({email: userData.email});
        if (user) {
            return res.status(409).json({message: "user with given email already exists"});
        }

        user = await database.addUser(userData);
        let userToken = await database.addUserToken(user._id);

        const verifyUrl = `http://localhost:5000/api/register/${user._id}/verify/${userToken.token}`;

        const mailSettings = {
            to: userData.email,
            subject: `Verefication, ${userData.firstName}`,
            text: `hello, ${userData.firstName} your verefication link is ${verifyUrl}, or verification code ${userToken.token}`
        }   
        
        let mailRes = sendMail(mailSettings);
        console.log(mailRes);
        res.status(200).json({message: "succesfully created user"})
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

RegRouter.post("/password", jsonParser, async (req, res) => {
    try {
        const userData = req.body;
        const { validationError } = validatePassword(userData);
        
        if (validationError) {
            return res.status(400).json({message: validationError.details[0].message});
        }

        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(userData.password, salt);

        let user = await database.findUser({email: userData.email});
        if (!user) {
            return res.status(404).json({message: "user with this email does not exist"});
        }

        await database.updateUser({id: user._id, password: hashedPassword});
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

RegRouter.post("/verifycode", jsonParser, async (req, res) => {
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
        res.json({message: "successfully verified user"});
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

RegRouter.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await database.findUser({_id: req.params.id});

        if (user) {
            const token = await database.findToken({id: user._id, token: req.params.token});
            if (!token) 
                return res.status(400).json({message: "invalid or expired link"});

            await database.updateUser({id: user._id, verified: true});
            await token.remove();
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

RegRouter.get("/user/:email", async (req, res) => {
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
})

export default RegRouter;
