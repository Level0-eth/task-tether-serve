import mongoose from "mongoose";

const dbconnection = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
  
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
  
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "tasktether"
    });
  } catch (err) {
    console.error("Failed to connect to database.", err);
    process.exit(1);
  }
};

export { dbconnection };
