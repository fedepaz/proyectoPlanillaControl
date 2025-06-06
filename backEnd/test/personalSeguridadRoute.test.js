import { expect } from "chai";
import sinon from "sinon";
import app from "../index.js";
import { PersonalSeguridadEmpresa } from "../models/personalModel.js";
import { generateMockPersonalEmpresa } from "./mockGenerator.js";
import { createAuthAgent } from "./test-helpers.js";

before(function () {
  process.env.SECRET_JWT_KEY = "palabraSecreta";
});

after(function () {
  delete process.env.SECRET_JWT_KEY;
});

describe("GET /personalSeguridad", function () {
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
    findStub = sinon.stub(PersonalSeguridadEmpresa, "find").returns({
      populate: sinon.stub().returns({
        exec: sinon.stub().resolves(mockListPersonal),
      }),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object, with an array", function (done) {
    const agent = createAuthAgent(app);
    agent.get("/personalSeguridad").end((_err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").that.is.not.empty;
      expect(res.body[0]).to.have.property("lastname", "Paz");
      done();
    });
  });
});

/**
         * 
        describe("GET BY ID /personalSeguridadEmpresa/:id", function () {
  let findStub;
  before(function () {
    const mockPersonal = generateMockPersonalEmpresa("Paz");
    findStub = sinon.stub(PersonalSeguridadEmpresa, "findById").returns({
      exec: sinon.stub().resolves(mockPersonal),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object", function (done) {
    request(app)
      .get("/personalSeguridad/456789")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return status 500 if id doesn't exist", function (done) {
    findStub.resolves(null);

    request(app)
      .get("/personalSeguridad/88888")
      .end((_err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});

describe("GET BY DNI /personalSeguridad/dni/:dni", function () {
  let findStub;
  before(function () {
    const mockPersonal = generateMockPersonalEmpresa("Paz");
    findStub = sinon.stub(PersonalSeguridadEmpresa, "findOne").returns({
      exec: sinon.stub().resolves(mockPersonal),
    });
  });

  after(function () {
    findStub.restore();
  });

  it("should return status 200 and an object", function (done) {
    request(app)
      .get("/personalSeguridad/dni/35456789")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return status 404 if no DNI", function (done) {
    findStub.resolves(null);

    request(app)
      .get("/personalSeguridad/dni/88888")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});

describe("POST /personalSeguridad", function () {
  let createStub;
  this.timeout(10000);

  before(async function () {
    const mockPersonal = generateMockPersonalEmpresa("Paz");
    createStub = sinon
      .stub(PersonalSeguridadEmpresa, "create")
      .resolves(mockPersonal);
  });

  after(function () {
    createStub.restore();
  });

  it("should return 201 and personalSeguridad created", function (done) {
    const mockPersonal = generateMockPersonalEmpresa("Paz");

    request(app)
      .post("/personalSeguridad")
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
      .post("/personalSeguridad")
      .send(incompletePersonal)
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
 */
