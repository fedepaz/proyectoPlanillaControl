import { expect } from "chai";
import request from "supertest";
import app from "../index.js";

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

describe("GET DATA /data", function () {
  it("should return status 200", function (done) {
    request(app)
      .get("/data")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
