import db from "mongoose";
import userModel from "./models/user.js";
import tokenModel from "./models/userToken.js";
import crypto from "crypto";

class Database {
    constructor(url) {
        console.log(url);
        this.connection = db.connect(url, {useNewUrlParser: true})
            .then (
                () => {console.log("database connected")}
            )
            .catch (
                error => {console.log(error)}
            );
            
        this.url = url;
    }

    async addUser(data) {
        try {
            const user = await userModel.create(data);
            console.log(`created user ${user}`);
            return user;
        } 
        catch (error) {
            console.error(error);
        }
    }

    async addUserToken(userId) {
        try {
            const token = await new tokenModel({
                userId: userId,
                token: crypto.randomBytes(16).toString("hex"),
            })
            .save();
            console.log("created token");
            return token;
        } 
        catch (error) {
            console.error(error);
        }
    }

    findUser(data) {
        return userModel.findOne(data);
    }

    findToken(data) {
        return tokenModel.findOne(data);
    }

    async updateUser(data) {
        await userModel.updateOne(data);
    }
}

const database = new Database(process.env.MONGO_URI);

Object.freeze(database);

export default database;

