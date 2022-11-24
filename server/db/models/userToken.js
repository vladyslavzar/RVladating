import mongoose from "mongoose";

const userToken = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        expires: 3600,
    }
});

const token = mongoose.model("token", userToken);
export default token;
