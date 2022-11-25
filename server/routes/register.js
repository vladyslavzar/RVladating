import express from 'express';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import sendMail from "./utils/sendMail.js";
import database from "./utils/database.js";
import validate from "./utils/validate.js";

const RegRouter = express.Router();

const jsonParser = bodyParser.json({ extended: false });

RegRouter.post("/", jsonParser, async (req, res) => {
    try {
        const userData = req.body;
        const { validationError } = validate(userData);
        
        if (validationError) {
            return res.status(400).json({message: validationError.details[0].message});
        }

        let user = await database.findUser({email: userData.email});
        if (user) {
            return res.status(409).json({message: "user with given email already exists"});
        }

        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(userData.password, salt);

        user = await database.addUser({...userData, password: hashedPassword});
        let userToken = await database.addUserToken(user._id);

        const verifyUrl = `http://localhost:5000/api/register/${user._id}/verify/${userToken.token}`;

        const mailSettings = {
            to: userData.email,
            subject: `Verefication, ${userData.firstName}`,
            text: `hello, ${userData.firstName} your verefication link is ${verifyUrl}`
        }   
        
        let mailRes = sendMail(mailSettings);
        console.log(mailRes);
        res.status(200).json({message: "succesfully created user"})
    }
    catch (error) {
        console.error(error);
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
    }
});

export default RegRouter;
