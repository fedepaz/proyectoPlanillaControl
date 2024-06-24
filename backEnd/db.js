// db.js

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDBURL);
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
