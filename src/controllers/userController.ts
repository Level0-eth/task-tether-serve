import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel";
import { User } from "../types/user";

export const singupController = async (req: Request, res: Response) => {
  const { userId, name, lastName, photoUrl, authDate, chatID, password }: User =
    req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = new UserModel({
    userId: userId,
    name: name,
    lastName: lastName,
    photoUrl: photoUrl,
    authDate: authDate,
    chatID: chatID,
    password: hashedPassword,
  });

  user
    .save()
    .then(() => {
      res.status(Number(201)).json({
        message: "User is registered successfully",
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

  if (!user) {
    res.status(404).json({
      message: "User Not Found",
    });

    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const token = jwt.sign(
      {
        userId: user.userId,
        name: user.name,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        chatID: user.chatID,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.send({
      token: token,
      message: "User Logged In Successfully",
    });
  } else {
    res.status(409).json({
      message: "bhai password galat hai",
    });
  }
};
