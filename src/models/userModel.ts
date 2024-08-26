import mongoose, { Schema } from "mongoose";

import ListModel, { listSchema } from "./listModel";

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
    },
    lastName: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
    authDate: {
        type: String,
        required: true,
    },
    chatID: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lists: [listSchema]
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
