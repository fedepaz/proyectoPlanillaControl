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

  it("should return status 200 and an array", function (done) {
    request(app)
      .get("/planillas")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object").that.has.all.keys("count", "data");
        expect(res.body.data).to.be.an("array").that.is.not.empty;
        done();
      });
  });

  it("should return planillas options", function (done) {
    request(app)
      .get("/planillas")
      .end((_err, res) => {
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

describe("GET BY ID /planillas/:id", function () {
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

  it("should return status 200 and an object", function (done) {
    request(app)
      .get("/planillas/123456")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return correct planilla with properties", function (done) {
    request(app)
      .get("/planillas/123456")
      .end((_err, res) => {
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
  it("should return status 500 if id doesn't exist", function (done) {
    findStub.resolves(null);
    request(app)
      .get("/planillas/888888")
      .end((_err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body)
          .to.have.property("message")
          .that.equals("Planilla not found");
        done();
      });
  });
});

describe("POST /planillas", function () {
  let createStub;

  this.timeout(10000);

  before(async function () {
    const mockPlanilla = generateMockPlanilla("Paz");
    createStub = sinon.stub(Planilla, "create").resolves(mockPlanilla);

    global.validTipoControl = await fetchOptions(TipoControl);
    global.validMediosTec = await fetchOptions(MediosTec);
    global.validTipoPro = await fetchOptions(TipoPro);
    global.validDemora = await fetchOptions(Demora);
    global.validTipoVuelo = await fetchOptions(TipoVuelo);
    global.validFuncion = await fetchOptions(Funcion);
  });

  after(function () {
    createStub.restore();
  });

  it("should return 201 and planilla created", function (done) {
    const mockPlanilla = generateMockPlanilla("Paz");

    request(app)
      .post("/planillas")
      .send(mockPlanilla)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
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

  it("should return status 400 if required fields are missing", function (done) {
    const incompletePlanilla = generateMockPlanilla("Paz");
    delete incompletePlanilla.datosPsa;

    request(app)
      .post("/planillas")
      .send(incompletePlanilla)
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});

describe("PUT /planillas/:id", function () {
  let updateStub;

  this.timeout(10000);

  before(async function () {
    const mockPlanilla = generateMockPlanilla("Paz");
    updateStub = sinon
      .stub(Planilla, "findByIdAndUpdate")
      .resolves(mockPlanilla);
  });

  after(function () {
    updateStub.restore();
  });

  it("should return 200 and planilla updated successfully", function (done) {
    const mockPlanilla = generateMockPlanilla("Martinez");

    const id = "someMockId";

    request(app)
      .put(`/planillas/${id}`)
      .send(mockPlanilla)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body)
          .to.have.property("message")
          .that.equals("Planilla updated successfully");
        expect(res.body).to.have.property("data").that.is.an("object");
        done();
      });
  });

  it("should return status 400 if required fields are missing", function (done) {
    const incompletePlanilla = generateMockPlanilla("Martinez");
    delete incompletePlanilla.datosPsa;

    const id = "someMockId";

    request(app)
      .put(`/planillas/${id}`)
      .send(incompletePlanilla)
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should return 404 if the planilla with the given 'id' does not exist", function (done) {
    const mockPlanilla = generateMockPlanilla("Paz");

    updateStub.resolves(null);

    const invalidId = "8888";

    request(app)
      .put(`/planillas/${invalidId}`)
      .send(mockPlanilla)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property("message")
          .that.equals("Planilla not found");
        done();
      });
  });

  describe("DELETE /planillas/:id", function () {
    let deleteStub;

    this.timeout(10000);

    before(async function () {
      const mockPlanilla = generateMockPlanilla("Paz");
      deleteStub = sinon.stub(Planilla, "findByIdAndDelete").callsFake((id) => {
        if (id === "nonexistentId") {
          return { exec: () => Promise.resolve(null) };
        } else if (id === "8888") {
          return Promise.resolve(null);
        } else {
          return { exec: () => Promise.resolve(mockPlanilla) };
        }
      });
    });

    after(function () {
      deleteStub.restore();
    });

    it("should return 200 and planilla deleted successfully", function (done) {
      const id = "11111";

      request(app)
        .delete(`/planillas/${id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body)
            .to.have.property("message")
            .that.equals("Planilla Deleted");
          done();
        });
    });

    it("should return 404 if the planilla with the given 'id' does not exist", function (done) {
      const invalidId = "nonexistentId";

      request(app)
        .delete(`/planillas/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          expect(res.body)
            .to.have.property("message")
            .that.equals("Planilla not found");
          done();
        });
    });
    it("should return 500 if the given 'id' does not exist", function (done) {
      request(app)
        .delete(`/planillas/8888`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(500);
          expect(res.body)
            .to.have.property("message")
            .that.equals("ID don't exists...");
          done();
        });
    });
  });
});
