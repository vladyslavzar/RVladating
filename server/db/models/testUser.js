import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;