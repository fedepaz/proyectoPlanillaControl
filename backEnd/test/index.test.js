import { expect } from "chai";
import request from "supertest";
import app from "../index.js";

describe("home funciona", function () {
  it("should return status 234 and <h1>PLanillas</h1>", function (done) {
    request(app)
      .get("/")
      .end((err, res) => {
        expect(res.status).to.equal(234);
        expect(res.text).to.contain("<h1>PLanillas</h1>");
        done();
      });
  });
});

describe("data funciona", function () {
  it("should return status 200", function (done) {
    request(app)
      .get("/data")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
