import { Request, Response, NextFunction } from "express";

import User from "../models/userModel";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phoneNumber } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    const userPhoneNumber = await User.findOne({ phoneNumber });
    
    if (userEmail) {
      res.status(401).json({
        message: "Email Id is already Used..!",
      });
    } else if(userPhoneNumber) {
      res.status(401).json({
        message: "Phone Number is already Used..!",
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
