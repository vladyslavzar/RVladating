import express from "express";
import APIRouter from "./routes/api.js";
import cors from "cors";
import RegRouter from './routes/register.js'

const app = express();

app.use(cors({origin: "*"}));
app.use("/api", APIRouter);
app.use("/api/register", RegRouter);


app.listen(5000, () => {console.log("server started on port 5000")});
