import { expect } from "chai";
import { authenticate } from "../middlewares/authenticate.js";
import { createAuthenticatedRequest } from "./mockJWT.js";
import sinon from "sinon";
import { signedCookie } from "cookie-parser";

describe("Authentication Middleware", function () {
  let req, res, next;
  beforeEach(() => {
    next = sinon.spy();
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  });

  it("should call next if the request is a OPTIONS request", function () {
    req = {
      method: "OPTIONS",
      path: "/",
    };
    authenticate(req, res, next);
    expect(next.calledOnce).to.be.true;
  });

  it("should call next if the request is a public route", function () {
    req = {
      method: "GET",
      path: "/public",
      signedCookies: {},
    };
    authenticate(req, res, next);
    expect(next.calledOnce).to.be.true;
  });

  it("should throw error when no token is provided", function () {
    req = {
      method: "GET",
      path: "/",
      signedCookies: {},
    };

    expect(() => authenticate(req, res, next)).to.throw("No token provided");
  });

  it("should set req.user and call next when valid token is provided", function () {
    req = createAuthenticatedRequest({ role: "admin" });

    authenticate(req, res, next);
    expect(req.user).to.exist;
    expect(next.calledOnce).to.be.true;
  });
});
