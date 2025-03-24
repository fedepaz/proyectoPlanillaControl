import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDBURL);
    return true;
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};
