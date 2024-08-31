import { Router } from "express";

import { authMiddleware } from "../middlewares/auth";
import {
  singupController,
  loginController,
  getUserController,
  getInfo,
} from "../controllers/userController";

const router = Router();

router.post("/signup", authMiddleware, singupController);
router.post("/login", loginController);
router.post("/getUser", getUserController);

router.get("/info", getInfo);

export default router;
