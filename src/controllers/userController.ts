import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/userModel";
import { User } from "../types/user";

export const singupController = async (req: Request, res: Response) => {
  const { userId, name, lastName, photoUrl, authDate, chatID, password }: User = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 8);

  const user = new UserModel({
    userId: userId,
    name: name,
    lastName: lastName,
    photoUrl: photoUrl,
    authDate: authDate,
    chatID: chatID,
    password: hashedPassword
  });

  user
    .save()
    .then(() => {
      res.status(Number(201)).json({
        message: "User is registered successfully"
      });
    })
    .catch((err) => {
        console.log(err);
      res.status(Number(400)).json({
        message: "DB ERROR",
      });
    });
};

export const loginController = async (req: Request, res: Response) => {
  const { userId, password } = req.body;

  const user = await UserModel.findOne({ userId });

  console.log(user);
  if(!user) {
    res.status(404).json({
      message: "User Not Found",
    });

    return;
  }
}
