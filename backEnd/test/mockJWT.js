import cookieParser from "cookie-parser";
import { signJWT } from "../utils/jwt.utils.js";

export const generateMockAuthCookie = (userData = {}, options = {}) => {
  const { cookieName = "access_token" } = options;

  const defaultUser = {
    id: "507f1f77bcf86cd799439011",
    role: "user",
    ...userData,
  };

  const token = signJWT(defaultUser);

  const cookieValue = cookieParser.signedCookie(
    `${cookieName}=${token}`,
    process.env.COOKIE_SECRET
  );

  return {
    token,
    cookieValue,
    cookieHeader: ["Cookie", cookieValue],
    user: defaultUser,
  };
};

export const createAuthenticatedRequest = (userData = {}) => {
  const { cookieValue, user } = generateMockAuthCookie(userData);
  return {
    cookieValue,
    user,
    cookies: {},
    headers: {},
    path: "/data",
  };
};
