import { Request, Response, Router } from "express";

import validateUser from "../middlewares/validateUser";
import { createList, getLists } from "../controllers/listController";

const router = Router();

router.post("/createList", validateUser, createList);
router.get("/getLists", validateUser, getLists);

export default router;
