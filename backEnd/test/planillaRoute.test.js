import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import mongoose from "mongoose";
import app from "../index.js";
import { Planilla } from "../models/planillaModel.js";
import {
  TipoControl,
  MediosTec,
  TipoPro,
  Demora,
  TipoVuelo,
  Funcion,
} from "../models/opcionesModel.js";

describe("GET /planillas", function () {
  let findStub;

  before(function () {
    findStub = sinon.stub(Planilla, "find").returns({
      exec: sinon.stub().resolves([
        { _id: "1", name: "Option 1" },
        { _id: "2", name: "Option 2" },
      ]),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200", function (done) {
    request(app)
      .get("/planillas")
      .end((_err, res) => {
        console.log("Status Code:", res.status);
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("should return array", function (done) {
    request(app)
      .get("/planillas")
      .end((_err, res) => {
        console.log("Response Body:", res.body);
        expect(res.body).to.be.an("object").that.has.all.keys("count", "data");
        expect(res.body.data).to.be.an("array").that.is.not.empty;
        done();
      });
  });
  it("should return planillas options", function (done) {
    request(app)
      .get("/planillas")
      .end((_err, res) => {
        console.log("First Option:", res.body.data[0]);
        expect(res.body.data[0]).to.have.property("name", "Option 1");
        done();
      });
  });
});
