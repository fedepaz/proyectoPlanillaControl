import { Aeropuerto } from "../models/personalModel.js";

const generateUserOACICode = async () => {
  const prefix = "USR"; // Clear identifier for user-created airports
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    // Generate random letter for the 4th position
    const randomLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    ); // A-Z
    const code = `${prefix}${randomLetter}`;

    // Check if this code already exists
    const existing = await Aeropuerto.findOne({ codOACI: code });
    if (!existing) {
      return code;
    }
    attempts++;
  }

  // Fallback: use timestamp-based approach if random generation fails
  const timestamp = Date.now().toString(36).slice(-1).toUpperCase();
  return `USR${timestamp}`;
};

export { generateUserOACICode };
