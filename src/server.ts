require('dotenv').config();

import express from "express";
import userRoter from "./routers/user";

const app = express();

app.use("/v1/user", userRoter);

app.listen(process.env.PORT, () => {
    console.log("server is runnig ", process.env.PORT);
});
