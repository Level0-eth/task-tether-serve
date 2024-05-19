require("dotenv").config();

import express from "express";
import userRouter from "./routers/user";
import bodyParser from "body-parser";

import { dbconnection } from "./config/db";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbconnection();

app.use("/v1/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("server is runnig ", process.env.PORT);
});
