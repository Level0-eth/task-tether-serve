import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema({
  id: {
    type: Schema.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  labels: {
    type: [String],
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
