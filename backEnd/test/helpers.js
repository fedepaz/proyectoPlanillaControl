import request from "supertest";
import { signJWT } from "../utils/jwt.utils";
import crypto from "crypto";

const signCookie = (val, secret) => {
  if (!val) return "";
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(val);
  return val + "." + hmac.digest("base64").replace(/=+$/, "");
};

export const createTestAuth = (userData = {}, options = {}) => {
  const { cookieName = "access_token", expiresIn = "1h" } = options;
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

  const signedValue = signCookie(token, process.env.COOKIE_SECRET);

  return {
    user,
    token,
    cookieName,
    cookieString: `${cookieName}=${signedValue}`,
  };
};

export const createAuthenticatedAgent = (app, userData = {}, options = {}) => {
  const agent = request.agent(app);
  const { cookieString } = createTestAuth(userData, options);
  agent.jar.setCookie(cookieString);
  return agent;
};

export const loginTestUser = async (app, credentials = {}) => {
  const agent = request.agent(app);
  const loginData = {
    dni: "12345678",
    password: "12345678",
    ...credentials,
  };

  const response = await agent.post("/session/login").send(loginData);

  return { agent, response };
};

export const createMockAuthRequest = (userData = {}, path = "/data") => {
  const { token } = createTestAuth(userData);
  return {
    method: "GET",
    path,
    signedCookies: {
      access_token: token,
    },
    user: undefined,
    cookies: {},
    headers: {},
  };
};
