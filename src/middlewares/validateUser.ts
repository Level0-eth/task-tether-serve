import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  const token = auth?.split("Bearer ")[1];

  if (!token) {
    res.status(409).json({
      message: "auth token is missing",
    });
    return;
  }

  try {
    const match = jwt.verify(token as string, process.env.JWT_SECRET as string);
    req.body.user = match;
    next();
  } catch {
    res.status(409).json({
      message: "token expired",
    });
  }
};

export default validateUser;
