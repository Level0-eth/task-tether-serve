import { Request, Response } from "express";

import ListModel from "../models/listModel";
import UserModel from "../models/userModel";

export const createList = async (req: Request, res: Response) => {
  const { user, title } = req.body;

  try {
    const list = new ListModel({ list_name: title });

    await UserModel.updateOne(
      { id: user._id },
      { $push: { lists: list } }
    );

    res.status(200).json({
      message: "list is created successfully",
      data: {
        id: list._id,
        name: list.list_name,
      },
    });
  } catch {
    res.status(400).json({
      message: "Error while creating a list",
    });
  }
};
