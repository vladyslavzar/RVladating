import express from 'express';
import bcrypt from "bcrypt";
import sendMail from "../utils/sendMail.js";
import database from "../../../database/database.js";
import { validateEmail, validatePassword } from "../utils/validate.js";
import RegVerifyRouter from './verify.js';

const RegRouter = express.Router();

RegRouter.use("/verify", RegVerifyRouter);

//email
RegRouter.post("/", async (req, res) => {
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

        const verifyUrl = `http://localhost:5000/users/register/verify/${user._id}/${userToken.token}`;

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

//password
RegRouter.post("/password", async (req, res) => {
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
        res.json({message: "succesfully created password"});
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

//name (all profile info in future)
RegRouter.post("/name", async (req, res) => {
    try {
        const user = await database.findUser({email: req.body.email});
        if (!user) {
           res.status(404).json({message: "user with this email does not exist"});
        }

        database.updateUser({id: user._id, name: req.body.name, finished: true});
        res.json({message: "success"});
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

export default RegRouter;
