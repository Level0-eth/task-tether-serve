import mongoose, { Schema } from "mongoose";

const listSchema = new mongoose.Schema({
    id: {
        type: Schema.ObjectId
    },
   list_name: {
        type: String,
        requird: true
    },
});

const ListModel = mongoose.model('List', listSchema);

export default ListModel;
export { listSchema };
