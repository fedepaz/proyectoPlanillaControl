import { verifyJWT } from "../utils/jwt.utils.js";
import { PublicRoutes } from "../enums/enums.js";

export const authenticate = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (PublicRoutes.includes(req.path) || req.path === "/public") {
    return next();
  }

  // Use universal-cookie-express for cookie access
  const token = req.universalCookies.get("access_token");
  console.log("token", token);
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.split(" ")[1];
  console.log("headerToken", headerToken);

  if (!token) {
    try {
      const decoded = verifyJWT(headerToken);
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const decoded = verifyJWT(token);
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  }
};
