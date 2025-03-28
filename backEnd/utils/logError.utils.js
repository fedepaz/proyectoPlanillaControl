import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import os from "os";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const LOG_DIR = join(__dirname, "../../logs");
const LOG_FILE = join(LOG_DIR, "error.log");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const extractClientInfo = (req) => {
  if (!req) return {};

  return {
    ip:
      req.ip ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.headers["x-forwarded-for"] ||
      "Unknown IP",

    userAgent: req.get("User-Agent") || "Unknown User Agent",

    requestHeaders: req.headers
      ? Object.entries(req.headers)
          .filter(
            ([key]) =>
              !key.toLowerCase().includes("cookie") &&
              !key.toLowerCase().includes("authorization")
          )
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      : {},

    hostname: os.hostname(),

    requestPath: req.originalUrl || req.url || "Unknown Path",

    method: req.method || "N/A",

    protocol: req.protocol || "Unknown Protocol",

    timestamp: new Date().toISOString(),
  };
};

const logError = (error, req = {}, additionalContext = {}) => {
  const clientInfo = extractClientInfo(req);

  const logEntry = JSON.stringify(
    {
      timestamp: clientInfo.timestamp,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack ? error.stack.split("\n").slice(0, 5) : [],
      },
      client: {
        ip: clientInfo.ip,
        userAgent: clientInfo.userAgent,
        hostname: clientInfo.hostname,
        protocol: clientInfo.protocol,
      },
      request: {
        path: clientInfo.requestPath,
        method: clientInfo.method,
        headers: clientInfo.requestHeaders,
        body: req.body ? JSON.stringify(req.body) : "N/A",
      },
      additionalContext: additionalContext,
    },
    null,
    2
  );

  const formattedLogEntry = `
-----------------------------------
${logEntry}
-----------------------------------\n`;

  try {
    fs.appendFileSync(LOG_FILE, formattedLogEntry);
  } catch (writeError) {
    console.error("Error writing to log file:", writeError);
  }
};

const rotateLogs = () => {
  const MAX_SIZE = 1024 * 1024 * 10; // 10 MB
  try {
    const stats = fs.statSync(LOG_FILE);
    if (stats.size > MAX_SIZE) {
      const archiveName = join(LOG_DIR, `error-${Date.now()}.log`);
      fs.renameSync(LOG_FILE, archiveName);
      console.log(`Rotated log archived: ${archiveName}`);
    }
  } catch (err) {
    console.error("Error rotating logs:", err);
  }
};

// Rotate logs daily
setInterval(rotateLogs, 1000 * 60 * 60 * 24);

export default logError;
