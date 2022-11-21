import express from 'express';
import bodyParser from "body-parser";

const APIRouter = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

APIRouter.get("/", (req, res) => {
    res.json({testArray: ["rvl", "rvl1", "rvl2", "rvl3", "rvl4"]});
});

export default APIRouter;
