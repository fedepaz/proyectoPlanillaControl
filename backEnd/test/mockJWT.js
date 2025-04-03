import { signJWT } from "../utils/jwt.utils.js";

export const generateMockAuthCookie = (userData = {}, options = {}) => {
  const { cookieName = "access_token" } = options;

  const defaultUser = {
    id: "507f1f77bcf86cd799439011",
    role: "user",
    ...userData,
  };

  const token = signJWT(defaultUser);

  const cookieValue = `${cookieName}=${token}; HttpOnly; Path=/; Signed`;

  return {
    token,
    cookieValue,
    cookieHeader: ["Cookie", cookieValue],
    user: defaultUser,
  };
};

export const createAuthenticatedRequest = (userData = {}) => {
  const { token, user } = generateMockAuthCookie(userData);
  return {
    signedCookies: {
      access_token: token,
    },
    user,
    cookies: {},
    headers: {},
    path: "/test-path",
  };
};
