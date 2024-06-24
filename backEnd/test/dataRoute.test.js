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

describe("GET /data/tipoControl", function () {
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

  it("should return status 200", function (done) {
    request(app)
      .get("/data/tipoControl")
      .end((_err, res) => {
        console.log("Status Code:", res.status);
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("should return array", function (done) {
    request(app)
      .get("/data/tipoControl")
      .end((_err, res) => {
        console.log("Response Body:", res.body);
        expect(res.body.tipoControl).to.be.an("array").that.is.not.empty;
        done();
      });
  });
  it("should return tipoControl options sinon", function (done) {
    request(app)
      .get("/data/tipoControl")
      .end((_err, res) => {
        console.log("First Option:", res.body.tipoControl[0]);
        expect(res.body.tipoControl[0]).to.have.property("label", "Option 1");
        done();
      });
  });
});

/*
describe("GET /data/mediosTec", function () {
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
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.mediosTec).to.be.an("array").that.is.not.empty;
        expect(res.body.mediosTec[0]).to.have.property("label", "Option 2");
        done();
      });
  });
});


*/
