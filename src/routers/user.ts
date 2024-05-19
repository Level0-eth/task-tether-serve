import { Router, Request, Response } from "express";

import { authMiddleware } from "../middlewares/auth";
import User from "../models/userModel";

const router = Router();

router.post("/signin", authMiddleware, (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = new User({
    name, email
  });

  user.save().then((savedUser) => {
    res.status(Number(201)).json(savedUser);
  }).catch(() => {
    res.status(Number(400)).json({
        message: "DB ERROR"
    });
  });
});

export default router;
