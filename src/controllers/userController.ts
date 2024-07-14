import { Request, Response } from "express";

import UserModel from "../models/userModel";
import { User } from "../types/user";

export const userController = (req: Request, res: Response) => {
  const { name, lastName, photoUrl, authDate, chatID }: User = req.body;

  const user = new UserModel({
    name,
    lastName,
    photoUrl,
    authDate,
    chatID,
  });

  user
    .save()
    .then((savedUser) => {
      res.status(Number(201)).json(savedUser);
    })
    .catch((err) => {
        console.log(err);
      res.status(Number(400)).json({
        message: "DB ERROR",
      });
    });
};
