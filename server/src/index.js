import express from "express";
import UsersRouter from "./routes/users/users.js";
import Cors from "cors";
import bodyParser from "body-parser";

const app = express();
const jsonParser = bodyParser.json({ extended: false });

//middleware
app.use(Cors({origin: "*"}));
app.use(jsonParser);

//routes
app.use("/users", UsersRouter);

app.listen(5000, () => {console.log("server started on port 5000")});
