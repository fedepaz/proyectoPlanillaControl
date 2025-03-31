import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import os from "os";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const LOG_DIR = join(dirname, "../../logs"); // Adjust path as needed
const LOG_FILE = join(LOG_DIR, "error.log");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const extractClientInfo = (error) => {
  const req = error.request || {};
  return {
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

const logError = (error) => {
  const timestamp = new Date().toISOString();
  const clientInfo = extractClientInfo(error);

  const logEntry = `[${timestamp}]
    URL: ${error.request?.originalUrl}
    Method: ${error.method || "N/A"}
    Body: ${error.body || "N/A"}
    Client IP: ${clientInfo.ip}
    User Agent: ${clientInfo.userAgent}
    Hostname: ${clientInfo.hostname}
    Referer: ${clientInfo.referer}
    Cookies: ${clientInfo.cookies}
    Content Type: ${clientInfo.contentType}
    Protocol: ${clientInfo.protocol}
    Stack: ${error.stack.split("\n").slice(0, 5).join("\n")}
    ---------------------\n
    `;
  fs.appendFileSync(LOG_FILE, logEntry, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
};

const rotateLogs = () => {
  const MAX_SIZE = 1024 * 1024 * 10; // 10 MB
  fs.stat(LOG_FILE, (err, stats) => {
    if (!err && stats.size > MAX_SIZE) {
      const archiveName = `error-${Date.now()}.log`;
      fs.rename(LOG_FILE, archiveName, (err) => {
        if (!err) console.log(`Rotate log archived: ${archisveName}`);
      });
    }
  });
};

setInterval(rotateLogs, 1000 * 60 * 60 * 24); // 24 hours

export default logError;
