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

describe("GET BY ID /oficial/:id", function () {
  let findStub;
  before(function () {
    const mockOficial = generateMockOficial("Paz");
    findStub = sinon.stub(Oficial, "findById").returns({
      exec: sinon.stub().resolves(mockOficial),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object", function (done) {
    request(app)
      .get("/oficial/456789")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return status 500 if id doesn't exist", function (done) {
    findStub.resolves(null);

    request(app)
      .get("/oficial/88888")
      .end((_err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body)
          .to.have.property("message")
          .that.equals("Oficial not found");
        done();
      });
  });
});

describe("GET BY DNI /oficial/dni/:dni", function () {
  let findStub;
  before(function () {
    const mockOficial = generateMockOficial("Paz");
    findStub = sinon.stub(Oficial, "findOne").returns({
      exec: sinon.stub().resolves(mockOficial),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object", function (done) {
    request(app)
      .get("/oficial/dni/35456789")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return status 404 if no DNI", function (done) {
    findStub.resolves(null);

    request(app)
      .get("/oficial/dni/88888")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message").that.equals("No DNI");
        done();
      });
  });
});

describe("POST /oficial", function () {
  let createStub;
  this.timeout(10000);

  before(async function () {
    const mockOficial = generateMockOficial("Paz");
    createStub = sinon.stub(Oficial, "create").resolves(mockOficial);
  });

  after(function () {
    createStub.restore();
  });

  it("should return 201 and oficial created", function (done) {
    const mockOficial1 = generateMockOficial("Paz");

    request(app)
      .post("/oficial")
      .send(mockOficial1)
      .end((_err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("dni").that.equals(mockOficial1.dni);
        expect(res.body)
          .to.have.property("firstname")
          .that.equals(mockOficial1.firstname);
        expect(res.body)
          .to.have.property("lastname")
          .that.equals(mockOficial1.lastname);
        expect(res.body)
          .to.have.property("legajo")
          .that.equals(mockOficial1.legajo);
        done();
      });
  });

  it("should return status 400 if required fields are missing", function (done) {
    const incompleteOficial = generateMockOficial("Paz");
    delete incompleteOficial.legajo;

    request(app)
      .post("/oficial")
      .send(incompleteOficial)
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
