import { verifyJWT } from "../utils/jwt.utils.js";
import { PublicRoutes } from "../enums/enums.js";

export const authenticate = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (PublicRoutes.includes(req.path) || req.path === "/public") {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("No token provided");
    error.name = "AuthenticationError";
    return next(error);
  }

  try {
    const decoded = verifyJWT(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
