import express from 'express';
import RegRouter from "./register.js";

const APIRouter = express.Router();

APIRouter.use("/register", RegRouter);

APIRouter.get("/", (req, res) => {
    res.json({testArray: ["rvl", "rvl1", "rvl2", "rvl3", "rvl4"]});
});

export default APIRouter;
