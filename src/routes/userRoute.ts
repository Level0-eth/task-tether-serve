import { Router } from "express";

import { authMiddleware } from "../middlewares/auth";
import { userController } from "../controllers/userController";

const router = Router();

router.post("/login", authMiddleware, userController);

export default router;
