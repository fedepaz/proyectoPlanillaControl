import { verifyJWT } from "../utils/jwt.utils.js";
import { PublicRoutes } from "../enums/enums.js";

export const authenticate = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (PublicRoutes.includes(req.path) || req.path === "/public") {
    return next();
  }

  console.log("=== COOKIE DEBUG INFO ===");
  console.log("Environment:", process.env.NODE_ENV);
  console.log("All cookies:", JSON.stringify(req.cookies));
  console.log("All signed cookies:", JSON.stringify(req.signedCookies));
  console.log("Headers:", req.headers.cookie);
  console.log("========================");

  const token =
    process.env.NODE_ENV === "test"
      ? req.cookies.access_token
      : req.signedCookies.access_token;

  console.log("cookies recibidas en request" + JSON.stringify(req.cookies));
  console.log(
    "cookiesFirmadas recibidas en request" + JSON.stringify(req.signedCookies)
  );
  console.log("token recibido en request" + token);
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
