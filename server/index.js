import express from "express";

const app = express();

app.get("/api", (req, res) => {
    res.json({testArray: ["rvl", "rvl1", "rvl2", "rvl3", "rvl4"]});
});

app.listen(5000);
