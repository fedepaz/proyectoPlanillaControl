import { signJWT } from "../utils/jwt.utils.js";

export const generateMockAuthCookie = (userData = {}, options = {}) => {
  const { cookieName = "access_token" } = options;

  if (!process.env.SECRET_JWT_KEY) {
    throw new Error("SECRET_JWT_KEY not set");
  }

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

  return {
    token,
    cookieHeader: `${cookieName}=${token}`,
    user: defaultUser,
  };
};

export const createAuthenticatedRequest = (userData = {}) => {
  const { cookieValue, user } = generateMockAuthCookie(userData);
  return {
    method: "GET",
    cookies: { access_token: user },
    headers: { cookie: cookieValue },
    path: "/data",
    user: undefined,
    cookieValue,
  };
};
