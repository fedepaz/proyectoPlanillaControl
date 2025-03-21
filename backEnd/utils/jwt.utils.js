import jwt from "jsonwebtoken";

export function signJWT(payload, expiresIn) {
  return jwt.sign(payload, process.env.SECRET_JWT_KEY, {
    algorithm: "HS256",
    expiresIn,
  });
}

export function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}
