import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({testArray: ["rvl", "rvl1", "rvl2"]});
});

app.listen(5000);
