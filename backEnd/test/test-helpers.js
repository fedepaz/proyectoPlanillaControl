// test/testHelpers.js
import request from "supertest";
import { signJWT } from "../utils/jwt.utils.js";

export const createAuthData = (userData = {}) => {
  const defaultUser = {
    dni: "12345678",
    oficialId: {
      dni: "12345678",
      firstname: "test",
      lastname: "user",
      legajo: "123456",
      id: "507f1f77bcf86cd799439011",
    },
    role: "admin",
    ...userData,
  };

  const token = signJWT(defaultUser);

  return {
    token,
    user: defaultUser,
    cookieHeader: `access_token=${token}`,
    authHeader: `Bearer ${token}`,
  };
};

export const authRequest = (app, method, url, userData = {}, body = null) => {
  const { cookieHeader, authHeader } = createAuthData(userData);
  let req;

  switch (method.toLowerCase()) {
    case "post":
      req = request(app).post(url);
      if (body) req.send(body);
      break;
    case "put":
      req = request(app).put(url);
      if (body) req.send(body);
      break;
    case "delete":
      req = request(app).delete(url);
      break;
    case "get":
    default:
      req = request(app).get(url);
  }

  req.set("Cookie", cookieHeader);
  req.set("Authorization", authHeader);

  return req;
};

export const createAuthAgent = (app, userData = {}) => {
  const agent = request.agent(app);
  const { cookieHeader, authHeader } = createAuthData(userData);

  agent.set("Cookie", cookieHeader);
  agent.set("Authorization", authHeader);

  return agent;
};
