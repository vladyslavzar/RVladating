import db from "mongoose";
import userModel from "./db/models/user.js";
import dotenv from "dotenv";

dotenv.config();

class Database {
    constructor(url) {
        this.connection = db.connect(url, {useNewUrlParser: true})
            .then (
                () => {console.log("connected")}
            )
            .catch (
                error => {console.log(error)}
            );
    }

    async addUser(data) {
        try {
            const user = await userModel.create(data);
            console.log(`created user ${user}`);
        } 
        catch (error) {
            console.error(error);
        }
    }
}

const database = new Database(process.env.MONGO_URI);

export default database;

