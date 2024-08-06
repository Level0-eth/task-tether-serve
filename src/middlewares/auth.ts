import { Request, Response, NextFunction } from "express";

import UserModel from "../models/userModel";
import { User } from "../types/user";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } : User = req.body;

  if(!userId) {
    res.status(409).json({
      message: "Please Provide User Id",
    });

    return;
  }

  try {
    const isIdPresent = await UserModel.findOne({ userId });
    
    if(isIdPresent) {
      res.status(409).json({
        message: "User Is already Present",
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
