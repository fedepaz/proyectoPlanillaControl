import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import mongoose from "mongoose";
import app from "../index.js";
import { Oficial } from "../models/personalModel.js";
import { generateMockOficial } from "./mockGenerator.js";

describe("GET /oficial", function () {
  let findStub;

  before(function () {
    const mockPaz = generateMockOficial("Paz");
    const mockMessi = generateMockOficial("Messi");
    const mockListOficial = [
      {
        _id: "1",
        dni: mockPaz.dni,
        firstname: mockPaz.firstname,
        lastname: mockPaz.lastname,
        legajo: mockPaz.legajo,
      },
      {
        _id: "2",
        dni: mockMessi.dni,
        firstname: mockMessi.firstname,
        lastname: mockMessi.lastname,
        legajo: mockMessi.legajo,
      },
    ];

    findStub = sinon.stub(Oficial, "find").returns({
      exec: sinon.stub().resolves(mockListOficial),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object, with an array", function (done) {
    request(app)
      .get("/oficial")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object").that.is.not.empty;
        expect(res.body["oficial"]).to.be.an("array").that.is.not.empty;
        expect(res.body["oficial"][0]).to.have.property("lastname", "Paz");
        done();
      });
  });
});
