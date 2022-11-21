import express from "express";
import APIRouter from "./routes/api.js";
import Cors from "cors";
import RegRouter from './routes/register.js'
import Database from "./database.js";

const app = express();

app.use(Cors({origin: "*"}));
app.use("/api", APIRouter);
app.use("/api/register", RegRouter);

// mongodb test
const db = new Database("mongodb://localhost/test");
db.addUser({firstName: "rvl", lastName: "eff", email: "kievskam@42l.ua", age: 12});

app.listen(5000, () => {console.log("server started on port 5000")});

