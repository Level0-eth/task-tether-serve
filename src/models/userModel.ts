import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: Schema.ObjectId
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        default: "N/A",
    },
    lastName: {
        type: String,
        required: true,
        default: "N/A",
    },
    photoUrl: {
        type: String,
        required: true,
        unique: true,
        default: "N/A",
    },
    authDate: {
        type: String,
        required: true,
        default: "N/A",
    },
    chatID: {
        type: String,
        required: true,
        default: "N/A",
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
