import { signJWT } from "../utils/jwt.utils.js";
import crypto from "crypto";

const sign = (payload, secret) => {
  if (!payload) return "";
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  return payload + "." + hmac.digest("base64").replace(/=+$/, "");
};

export const generateMockAuthCookie = (userData = {}, options = {}) => {
  const { cookieName = "access_token" } = options;

  const defaultUser = {
    dni: "12345678",
    oficialId: {
      dni: "12345678",
      firstname: "test",
      lastname: "user",
      legajo: "123456",
      id: "507f1f77bcf86cd799439011",
    },
    role: "user",
    ...userData,
  };

  const token = signJWT(defaultUser);

  const signCookie = sign(token, process.env.COOKIE_SECRET);

  return {
    token,
    cookieValue: `${cookieName}=${signCookie}`,
    cookieHeader: ["Cookie", `${cookieName}=${signCookie}`],
    user: defaultUser,
  };
};

export const createAuthenticatedRequest = (userData = {}) => {
  const { cookieValue, user } = generateMockAuthCookie(userData);
  return {
    method: "GET",
    signedCookies: {
      access_token: user,
    },
    cookies: {},
    headers: { cookie: cookieValue },
    path: "/data",
    user: undefined,
    cookieValue,
  };
};
