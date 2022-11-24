import express from "express";
import APIRouter from "./routes/api.js";
import Cors from "cors";

const app = express();

app.use(Cors({origin: "*"}));
app.use("/api", APIRouter);

app.listen(5000, () => {console.log("server started on port 5000")});
