import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    finished: {
        type: Boolean,
        default: false,
    },
    step: {
        type: Number,
        default: 1,
    }
});

const userModel = mongoose.model("user", userSchema);

export default userModel;