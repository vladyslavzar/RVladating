import express from 'express';

const APIRouter = express.Router();

APIRouter.get("/", (req, res) => {
    res.json({testArray: ["rvl", "rvl1", "rvl2", "rvl3", "rvl4"]});
});

export default APIRouter;
