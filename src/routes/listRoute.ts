import { Request, Response, Router } from "express";

import validateUser from "../middlewares/validateUser";
import ListModel from "../models/listModel";
import UserModel from "../models/userModel";

const router = Router();

router.post(
  "/createList",
  validateUser,
  async (req: Request, res: Response) => {
    console.log("createList ", req.body.user);
    const currentUser = req.body.user;
    try {
      const list = new ListModel({
        list_name: "test",
      });

      const doc = await list.save();

      await UserModel.updateOne(
        { id: currentUser._id },
        { $push: { lists: doc._id } }
      );
    } catch {
      console.log("error while creating the list");
    }
  }
);

export default router;
