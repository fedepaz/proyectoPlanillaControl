import { verifyJWT } from "../utils/jwt.utils.js";
import { PublicRoutes } from "../enums/enums.js";

export const authenticate = (req, res, next) => {
  console.log("authenticate");
  console.log("req.headers.cookie:", req.headers.cookie);
  console.log("req.cookies:", req.cookies);
  console.log("req.signedCookies:", req.signedCookies);

  if (req.method === "OPTIONS") {
    return next();
  }

  if (PublicRoutes.includes(req.path) || req.path === "/public") {
    return next();
  }
  const token = req.signedCookies.access_token;

  if (!token) {
    const error = new Error();
    error.name = "AuthenticationError";
    error.message = "No token provided";
    throw error;
  }

  try {
    const decoded = verifyJWT(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
