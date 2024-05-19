require("dotenv").config();

import express from "express";
import userRoute from "./routes/user";
import bodyParser from "body-parser";

import { dbconnection } from "./config/db";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbconnection();

app.use("/v1/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log("server is runnig ", process.env.PORT);
});
