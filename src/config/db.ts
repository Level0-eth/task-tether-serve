import mongoose from "mongoose";

const dbconnection = () => {
  const db = mongoose.connect(process.env.MONGODB_URL || "");

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });
};

export { dbconnection };
