import nodemailer from "nodemailer";

function sendMail(mailSettings) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    mailSettings.from = process.env.COMPANY_EMAIL;

    transporter.sendMail(mailSettings, (error, info) => {
        if (error) {
            throw error;
        }
        return info.response;
    })
}

export default sendMail;
