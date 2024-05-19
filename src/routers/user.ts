const { Router } = require("express");

const router = Router();

router.get("/", (req: any, res: any) => {
    res.send("Hello");
});

export default router;
