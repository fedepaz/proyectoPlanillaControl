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
import { generateMockPlanilla } from "./mockGenerator.js";

describe("GET /planillas", function () {
  let findStub;

  before(function () {
    const mockPaz = generateMockPlanilla("Paz");
    const mockMessi = generateMockPlanilla("Messi");
    const mockListPlanillas = [
      { _id: "1", mockPaz },
      { _id: "2", mockMessi },
    ];
    findStub = sinon.stub(Planilla, "find").returns({
      exec: sinon.stub().resolves(mockListPlanillas),
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
        console.log("First Option:", res.body.data[0]["mockPaz"]);
        expect(res.body.data[0]["mockPaz"])
          .to.have.property("datosPsa")
          .that.is.an("object");
        expect(res.body.data[0]["mockPaz"])
          .to.have.property("datosVuelo")
          .that.is.an("object");
        expect(res.body.data[0]["mockPaz"])
          .to.have.property("datosTerrestre")
          .that.is.an("array");
        expect(res.body.data[0]["mockPaz"])
          .to.have.property("datosSeguridad")
          .that.is.an("array");
        expect(res.body.data[0]["mockPaz"])
          .to.have.property("datosVehiculos")
          .that.is.an("array");
        expect(res.body.data[0]["mockPaz"])
          .to.have.property("novEquipajes")
          .that.is.a("string");
        expect(res.body.data[0]["mockPaz"])
          .to.have.property("novInspeccion")
          .that.is.a("string");
        expect(res.body.data[0]["mockPaz"])
          .to.have.property("novOtras")
          .that.is.a("string");
        done();
      });
  });
});

describe("GET /planillas/:id", function () {
  let findStub;

  before(function () {
    const mockPlanilla = generateMockPlanilla("Paz");

    findStub = sinon.stub(Planilla, "findById").returns({
      exec: sinon.stub().resolves(mockPlanilla),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200", function (done) {
    request(app)
      .get("/planillas/123456")
      .end((_err, res) => {
        console.log("Status Code:", res.status);
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("should return object", function (done) {
    request(app)
      .get("/planillas/123456")
      .end((_err, res) => {
        console.log("Response Body:", res.body);
        expect(res.body).to.be.an("object");
        done();
      });
  });
  it("should return correct planilla with properties", function (done) {
    request(app)
      .get("/planillas/123456")
      .end((_err, res) => {
        console.log("Response Body:", res.body);
        expect(res.body).to.have.property("datosPsa").that.is.an("object");
        expect(res.body).to.have.property("datosVuelo").that.is.an("object");
        expect(res.body).to.have.property("datosTerrestre").that.is.an("array");
        expect(res.body).to.have.property("datosSeguridad").that.is.an("array");
        expect(res.body).to.have.property("datosVehiculos").that.is.an("array");
        expect(res.body).to.have.property("novEquipajes").that.is.a("string");
        expect(res.body).to.have.property("novInspeccion").that.is.a("string");
        expect(res.body).to.have.property("novOtras").that.is.a("string");
        done();
      });
  });
});
