import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const LOG_DIR = join(__dirname, "../../logs"); // Adjust path as needed
const LOG_FILE = join(LOG_DIR, "error.log");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const logError = (error) => {
  const timestamp = new Date().toISOString();
  const logEntry = `
    [${timestamp}] ${error.name}: ${error.message}
    URL: ${error.request?.originalUrl}||${error.request?.url}
    Method: ${error.method || "N/A"}
    Body: ${error.body || "N/A"}
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
        if (!err) console.log(`Rotate log archived: ${archiveName}`);
      });
    }
  });
};

setInterval(rotateLogs, 1000 * 60 * 60 * 24); // 24 hours

export default logError;
