import { Request, Response, Router } from "express";

import validateUser from "../middlewares/validateUser";
import { createList } from "../controllers/listController";

const router = Router();

router.post("/createList", validateUser, createList);

export default router;
