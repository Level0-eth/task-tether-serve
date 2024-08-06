import { Request, Response, Router } from "express";

import { authMiddleware } from "../middlewares/auth";
import { singupController } from "../controllers/userController";
import UserModel from "../models/userModel";

const router = Router();

router.post("/singup", authMiddleware, singupController);

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

// router.post("/login", authMiddleware, userController);

export default router;
