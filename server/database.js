import db from "mongoose";
import userModel from "./db/models/testUser.js";

class Database {
    constructor(url) {
        this.connection = db.connect(url, {useNewUrlParser: true}, 
            () => {console.log("connected")}, 
            error => console.log(error)
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

export default Database;
