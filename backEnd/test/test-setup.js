import sinon from "sinon";
import { expect } from "chai";
import request from "supertest";
import app from "../index.js";
import { signJWT } from "../utils/jwt.utils.js";
import cookieParser from "cookie-parser";

global.expect = expect;
global.request = request;
global.sinon = sinon;
global.app = app;

global.generateMockAuthCookie = (userData = {}, options = {}) => {
  const { cookieName = "access_token" } = options;

  const defaultUser = {
    id: "507f1f77bcf86cd799439011",
    role: "user",
    ...userData,
  };

  const token = signJWT(defaultUser);

  const signedCookieValue = cookieParser.signedCookie(
    `${cookieName}=${token}`,
    process.env.COOKIE_SECRET
  );

  return {
    token,
    cookieValue: `${cookieName}=${signedCookieValue}`,
    cookieHeader: ["Cookie", `${cookieName}=${signedCookieValue}`],
    user: defaultUser,
  };
};

global.createAuthenticatedRequest = (userData = {}) => {
  const { cookieValue, user } = generateMockAuthCookie(userData);
  return {
    cookieValue,
    user,
    cookies: {},
    headers: {},
    path: "/data",
  };
};
