require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute";
import { dbconnection } from "./config/db";

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1/user", userRoute);

const startServer = async () => {
  await dbconnection();

  app.listen(process.env.PORT, () => {
    console.log("server is runnig ", process.env.PORT);
  });
}

startServer();
