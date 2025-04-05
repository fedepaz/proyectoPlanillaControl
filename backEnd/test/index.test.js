import { expect } from "chai";
import request from "supertest";
import app from "../index.js";

before(function () {
  process.env.SECRET_JWT_KEY = "palabraSecreta";
  process.env.COOKIE_SECRET = "galletitaSecreta";
});

after(function () {
  delete process.env.SECRET_JWT_KEY;
  delete process.env.COOKIE_SECRET;
});

describe("GET HOME /", function () {
  it("should return status 234 and planillasBackend", function (done) {
    request(app)
      .get("/")
      .end((err, res) => {
        expect(res.status).to.equal(234);
        expect(res.text).to.contain("planillasBackend");
        done();
      });
  });
});

describe("GET ERROR DATA /data", function () {
  it("should return error contact your administrator", function (done) {
    request(app)
      .get("/data")
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});

describe("GET DATA CONNECTION /data", function () {
  it("should return status 200 and data connected", function (done) {
    const req = createAuthenticatedRequest({ role: "user" });
    console.log("Before");
    console.log(req.signedCookies);
    console.log("cookieValue: ", req.cookieValue);
    request(app)
      .get("/data")
      .set("Cookie", req.cookieValue)
      .end((err, res) => {
        console.log("After");
        console.log(req.user);
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("message")
          .that.equals("Data Connected");
        done();
      });
  });
});
