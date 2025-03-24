import { Log } from "../models/errorModel.js";

const logErrorDB = async (error, request) => {
  try {
    await Log.create({
      level: "error",
      message: error.message,
      stack: error.stack,
      meta: {
        url: request.originalUrl,
        method: request.method,
        user: request.user?._id,
        ip: request.ip,
        browser: request.headers["user-agent"],
        os: request.headers["user-agent"],
      },
    });
  } catch (dBLogError) {
    console.error("Error saving error to database:", dBLogError);
  }
};

export default logErrorDB;
