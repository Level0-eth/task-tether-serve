import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel";
import { User } from "../types/user";
import bot from "../config/bot";

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
        id: user._id,
        userId: user.userId,
        name: user.name,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        chatID: user.chatID,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    bot.sendMessage(user.chatID, "Your are loggedin..!");

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

export const getUserController = async (req: Request, res: Response) => {
  const { userId } = req.body;

  let data = await UserModel.findOne({ userId });

  if (data) {
    res.status(200).json({
      message: "user is already exits",
    });
  } else {
    res.status(200).json({
      message: "user not found",
    });
  }
};

export const getInfo = async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  const token = auth?.split("Bearer ")[1];

  try {
    const match = jwt.verify(token as string, process.env.JWT_SECRET as string);
    res.json({
      match,
    });
  } catch {
    res.status(409).json({
      message: "token expired",
    });
  }
};
