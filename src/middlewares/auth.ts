import { Request, Response, NextFunction } from "express";

import UserModel from "../models/userModel";
import { User } from "../types/user";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chatID } : User = req.body;

  if(!chatID) {
    res.status(409).json({
      message: "Please Provide User Id",
    });

    return;
  }

  try {
    const isIdPresent = await UserModel.findOne({ chatID });
    
    if(isIdPresent) {
      res.status(409).json({
        message: "User Is already Availble",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong..!",
    });
  }
};

export { authMiddleware };
