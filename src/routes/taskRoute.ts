import { Request, Response, Router } from "express";
import mongoose from "mongoose";

import TaskModel from "../models/TaskModel";
import UserModel from "../models/userModel";
import validateUser from "../middlewares/validateUser";

const router = Router();

router.post(
  "/createTask/:id",
  validateUser,
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const listId = req.params.id;

    let session;

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      const newTask = new TaskModel({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
      });

      await newTask.save({ session });

      const doc = await UserModel.findOneAndUpdate(
        {
          _id: user.id,
          "lists._id": listId,
        },
        { $push: { "lists.$.tasks": newTask._id } },
        { new: true, session }
      );

      await session.commitTransaction();
      await session.endSession();

      res.status(200).json({
        message: "Task is added",
        data: newTask,
      });
    } catch (err) {
      if (session) {
        await session.abortTransaction();
        await session.endSession();
      }

      res.status(400).json({
        message: "Task creation is failed",
        data: null,
      });
    }
  }
);

router.post(
  "/deleteTask/:id/:taskId",
  validateUser,
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const listId = req.params.id;
    const taskId = req.params.taskId;

    let session;

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      const task = await TaskModel.findByIdAndDelete(taskId, { session });

      if (task == null) {
        throw new Error("Task not found");
      }

      await UserModel.findOneAndUpdate(
        {
          _id: user.id,
          "lists._id": listId,
        },
        { $pull: { "lists.$.tasks": taskId } },
        { new: true, session }
      );

      await session.commitTransaction();
      await session.endSession();

      res.status(200).json({
        message: "Task is Deleted",
      });
    } catch (err) {
      if (session) {
        await session.abortTransaction();
        await session.endSession();
      }

      res.status(400).json({
        message: "Task deletion is failed",
        data: null,
      });
    }
  }
);

export default router;
