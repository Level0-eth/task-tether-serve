import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

import { authMiddleware } from "../middlewares/auth";
import {
  singupController,
  loginController,
} from "../controllers/userController";
import UserModel from "../models/userModel";

const router = Router();

router.post("/signup", authMiddleware, singupController);
router.post("/login", loginController);

router.post("/getUser", async (req: Request, res: Response) => {
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
});

router.get("/info", async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  const token = auth?.split("Bearer ")[1];

  try {
    const match = jwt.verify(token as string, process.env.JWT_SECRET as string);
    res.json({
      match,
    });
  } catch {
    res.status(409).json({
      message: "token expired"
    });
  }
});

export default router;
