import express from 'express';
import bodyParser from "body-parser";
import sendMail from "../utils/sendMail.js";
import database from "../utils/database.js";
import dotenv from "dotenv";

dotenv.config();

const RegRouter = express.Router();

const jsonParser = bodyParser.json({ extended: false });

RegRouter.post("/", jsonParser, (req, res) => {
    const userData = req.body;

    const mailSettings = {
        from: process.env.COMPANY_EMAIL,
        to: userData.email,
        subject: `Verefication ${userData.firstName}`,
        text: `hello, ${userData.firstName} your verefication code is 123456`
    }   

    try {
        let result = sendMail(mailSettings);

        console.log(result);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.send("pizdec");
    }
});

export default RegRouter;
