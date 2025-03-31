import { Log } from "../models/errorModel.js";
import os from "os";

const extractClientInfo = (error) => {
  const req = error.request || {};
  return {
    url: req.originalUrl || "Unknown URL",
    method: req.method || "N/A",
    ip:
      req.ip ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      "Unknown IP",
    userAgent: req.headers?.["user-agent"] || "Unknown User Agent",
    hostname: os.hostname(),
    referer: req.headers?.referer || "Unknown Referer",
    cookies: req.headers?.cookie
      ? "Cookies Present in Request"
      : "Cookies Not Present in Request",
    contentType: req.headers?.["content-type"] || "Unknown Content Type",
    protocol: req.protocol?.toUpperCase() || "Unknown Protocol",
  };
};

const logErrorDB = async (error) => {
  const clientInfo = extractClientInfo(error);
  try {
    await Log.create({
      level: "error",
      message: error.message,
      stack: error.stack,
      meta: {
        url: clientInfo.url,
        method: clientInfo.method,
        user: error.request.user?.id,
        ip: clientInfo.ip,
        browser: clientInfo.userAgent,
        os: clientInfo.hostname,
      },
    });
  } catch (dBLogError) {
    console.error("Error saving error to database:", dBLogError);
  }
};

export default logErrorDB;
