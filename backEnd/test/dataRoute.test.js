import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import mongoose from "mongoose";
import app from "../index.js";
import {
  TipoControl,
  MediosTec,
  TipoPro,
  Demora,
  TipoVuelo,
  Funcion,
} from "../models/opcionesModel.js";

describe("GET TIPO CONTROL /data/tipoControl", function () {
  let findStub;

  before(function () {
    findStub = sinon.stub(TipoControl, "find").returns({
      select: sinon.stub().returns({
        exec: sinon.stub().resolves([{ _id: "1", label: "Option 1" }]),
      }),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and fetch tipoControl options", function (done) {
    request(app)
      .get("/data/tipoControl")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.tipoControl).to.be.an("array").that.is.not.empty;
        expect(res.body.tipoControl[0]).to.have.property("label", "Option 1");
        done();
      });
  });
});

describe("GET MEDIOS TEC /data/mediosTec", function () {
  let findStub;

  before(function () {
    findStub = sinon.stub(MediosTec, "find").returns({
      select: sinon.stub().returnsThis(),
      exec: sinon.stub().resolves([{ _id: "2", label: "Option 2" }]),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and fetch mediosTec options", function (done) {
    request(app)
      .get("/data/mediosTec")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.mediosTec).to.be.an("array").that.is.not.empty;
        expect(res.body.mediosTec[0]).to.have.property("label", "Option 2");
        done();
      });
  });
});

describe("GET TIPO PROCEDIMIENTOS /data/tipoPro", function () {
  let findStub;

  before(function () {
    findStub = sinon.stub(TipoPro, "find").returns({
      select: sinon.stub().returns({
        exec: sinon.stub().resolves([{ _id: "1", label: "Option1" }]),
      }),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and fetch tipoPro options", function (done) {
    request(app)
      .get("/data/tipoPro")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.tipoPro).to.be.an("array").that.is.not.empty;
        expect(res.body.tipoPro[0]).to.have.property("label", "Option1");
        done();
      });
  });
});

describe("GET DEMORA /data/demora", function () {
  let findStub;

  before(function () {
    findStub = sinon.stub(Demora, "find").returns({
      select: sinon.stub().returns({
        exec: sinon.stub().resolves([{ _id: "1", label: "Si" }]),
      }),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and fetch tipoPro options", function (done) {
    request(app)
      .get("/data/demora")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.demora).to.be.an("array").that.is.not.empty;
        expect(res.body.demora[0]).to.have.property("label", "Si");
        done();
      });
  });
});

describe("GET TIPO VUELO /data/tipoVuelo", function () {
  let findStub;

  before(function () {
    findStub = sinon.stub(TipoVuelo, "find").returns({
      select: sinon.stub().returns({
        exec: sinon.stub().resolves([{ _id: "1", label: "arribo" }]),
      }),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and fetch tipoPro options", function (done) {
    request(app)
      .get("/data/tipoVuelo")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.tipoVuelo).to.be.an("array").that.is.not.empty;
        expect(res.body.tipoVuelo[0]).to.have.property("label", "arribo");
        done();
      });
  });
});

describe("GET FUNCION /data/funcion", function () {
  let findStub;

  before(function () {
    findStub = sinon.stub(Funcion, "find").returns({
      select: sinon.stub().returns({
        exec: sinon.stub().resolves([{ _id: "1", label: "supervisor" }]),
      }),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and fetch tipoPro options", function (done) {
    request(app)
      .get("/data/funcion")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.funcion).to.be.an("array").that.is.not.empty;
        expect(res.body.funcion[0]).to.have.property("label", "supervisor");
        done();
      });
  });
});
