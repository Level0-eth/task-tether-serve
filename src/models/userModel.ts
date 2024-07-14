import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: Schema.ObjectId
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
        unique: true,
    },
    authDate: {
        type: String,
        required: true,
    },
    chatID: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
