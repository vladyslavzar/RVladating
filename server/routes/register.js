import express from 'express';
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const RegRouter = express.Router();

const companyEmail = "noreply.rvladating@gmail.com";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: companyEmail,
        pass: "zmxvdfifhpitqqru",
    },
    tls: {
        rejectUnauthorized: false
    }
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

RegRouter.post("/", urlencodedParser, (req, res) => {
    let reqEmail = req.body.email;
    let reqData = req.body.data;

    const mailSetting = {
        from: companyEmail,
        to: reqEmail,
        subject: `Verefication ${reqData}`,
        text: `hello, ${reqData} your verefication code is 12345678`
    }

    transporter.sendMail(mailSetting, (error, response) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(response.response);
        }
        res.send(`${reqData}, ${reqEmail}, ndm response: ${error == undefined ? response.response : error}`);
    });
});

export default RegRouter;
