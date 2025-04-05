import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";
import mongoose from "mongoose";
import app from "../index.js";
import { PersonalEmpresa } from "../models/personalModel.js";
import { generateMockPersonalEmpresa } from "./mockGenerator.js";
import { populate } from "dotenv";

describe("GET /personalEmpresa", function () {
  let findStub;

  before(function () {
    const mockPaz = generateMockPersonalEmpresa("Paz");
    const mockMessi = generateMockPersonalEmpresa("Messi");
    const mockListPersonal = [
      {
        id: mockPaz.id,
        dni: mockPaz.dni,
        firstname: mockPaz.firstname,
        lastname: mockPaz.lastname,
        empresa: mockPaz.empresa,
        legajo: mockPaz.legajo,
      },
      {
        id: mockMessi.id,
        dni: mockMessi.dni,
        firstname: mockMessi.firstname,
        lastname: mockMessi.lastname,
        empresa: mockMessi.empresa,
        legajo: mockMessi.legajo,
      },
    ];

    findStub = sinon.stub(PersonalEmpresa, "find").returns({
      populate: sinon.stub().returns({
        exec: sinon.stub().resolves(mockListPersonal),
      }),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object, with an array", function (done) {
    request(app)
      .get("/personalEmpresa")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array").that.is.not.empty;
        expect(res.body[0]).to.have.property("lastname", "Paz");
        done();
      });
  });
});
/**
 
describe("GET BY ID /personalEmpresa/:id", function () {
  let findStub;
  before(function () {
    const mockPersonal = generateMockPersonalEmpresa("Paz");
    findStub = sinon.stub(PersonalEmpresa, "findById").returns({
      exec: sinon.stub().resolves(mockPersonal),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object", function (done) {
    request(app)
      .get("/personalEmpresa/456789")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return status 500 if id doesn't exist", function (done) {
    findStub.resolves(null);

    request(app)
      .get("/personalEmpresa/88888")
      .end((_err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});

describe("GET BY DNI /personalEmpresa/dni/:dni", function () {
  let findStub;
  before(function () {
    const mockPersonal = generateMockPersonalEmpresa("Paz");
    findStub = sinon.stub(PersonalEmpresa, "findOne").returns({
      exec: sinon.stub().resolves(mockPersonal),
    });
  });
  
  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object", function (done) {
    request(app)
      .get("/personalEmpresa/dni/35456789")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return status 404 if no DNI", function (done) {
    findStub.resolves(null);

    request(app)
      .get("/personalEmpresa/dni/88888")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        done();
      });
    });
  });

  describe("POST /personalEmpresa", function () {
  let createStub;
  this.timeout(10000);

  before(async function () {
    const mockPersonal = generateMockPersonalEmpresa("Paz");
    createStub = sinon.stub(PersonalEmpresa, "create").resolves(mockPersonal);
  });

  after(function () {
    createStub.restore();
  });

  it("should return 201 and personalEmpresa created", function (done) {
    const mockPersonal = generateMockPersonalEmpresa("Paz");
    
    request(app)
      .post("/personalEmpresa")
      .send(mockPersonal)
      .end((_err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("dni").that.equals(mockPersonal.dni);
        expect(res.body)
        .to.have.property("firstname")
          .that.equals(mockPersonal.firstname);
          expect(res.body)
          .to.have.property("lastname")
          .that.equals(mockPersonal.lastname);
        expect(res.body)
          .to.have.property("legajo")
          .that.equals(mockPersonal.legajo);
        done();
      });
  });

  it("should return status 400 if required fields are missing", function (done) {
    const incompletePersonal = generateMockPersonalEmpresa("Paz");
    delete incompletePersonal.legajo;

    request(app)
      .post("/personalEmpresa")
      .send(incompletePersonal)
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
* 
*/
