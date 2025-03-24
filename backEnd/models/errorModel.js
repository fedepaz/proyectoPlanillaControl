import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  level: { type: String, required: true },
  message: { type: String },
  stack: { type: String, required: true },
  meta: {
    url: { type: String, required: true },
    method: { type: String, required: true },
    user: mongoose.Schema.Types.ObjectId,
    ip: { type: String, required: true },
    browser: { type: String, required: true },
    os: { type: String, required: true },
  },
});

export const Log = mongoose.model("Log", logSchema);
