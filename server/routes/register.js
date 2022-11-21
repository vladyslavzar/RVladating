import express from 'express';
import bodyParser from "body-parser";

const RegRouter = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

RegRouter.post("/", urlencodedParser, (req, res) => {
    res.send(`server got "${req.body.data}"`);
});

export default RegRouter;
