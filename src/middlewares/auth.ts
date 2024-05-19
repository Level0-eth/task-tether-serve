import { Request, Response, NextFunction } from "express";

import User from "../models/userModel";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      res.status(400).json({
        message: "Email Id is already singedin..!",
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
