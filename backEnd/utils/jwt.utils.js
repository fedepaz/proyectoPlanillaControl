import jwt from "jsonwebtoken";

export function signJWT(payload, expiresIn = "12h") {
  if (!process.env.SECRET_JWT_KEY) {
    throw new Error("JWT secret key not set");
  }

  return jwt.sign(payload, process.env.SECRET_JWT_KEY, {
    algorithm: "HS256",
    expiresIn,
  });
}

export function verifyJWT(token) {
  if (!process.env.SECRET_JWT_KEY) {
    throw new Error("JWT secret key not set");
  }
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    return jwt.verify(token, process.env.SECRET_JWT_KEY);
  } catch (error) {
    throw error;
  }
}
