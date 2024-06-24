// test/index.test.js

import { expect } from "chai";
import request from "supertest";
import app from "../index.js"; // Adjust the import based on your actual app export

describe("GET /", function () {
  it("should return status 234 and contain <h1>PLanillas</h1>", function (done) {
    request(app)
      .get("/")
      .end((err, res) => {
        expect(res.status).to.equal(234);
        expect(res.text).to.contain("<h1>PLanillas</h1>");
        done();
      });
  });
});

// Add more tests for other routes
describe("GET /data", function () {
  it("should return status 200 and the expected data", function (done) {
    request(app)
      .get("/data")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // Add more expectations based on your route's response
        done();
      });
  });
});

// Repeat for other routes
