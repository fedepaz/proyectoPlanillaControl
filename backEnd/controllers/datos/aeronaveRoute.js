import express from "express";
import { MatriculaAeronave, Empresa } from "../../models/personalModel.js";

const aeronaveRouter = express.Router();

aeronaveRouter.get("/", async (req, res, next) => {
  try {
    const matricula = await MatriculaAeronave.find().populate("empresa");
    return res.json(matricula);
  } catch (error) {
    next(error);
  }
});

aeronaveRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const matriculaAeronave = await MatriculaAeronave.findById(id).populate(
      "empresa"
    );
    if (!matriculaAeronave) {
      const error = new Error();
      error.status = 404;
      error.name = "MatriculaNotFound";
      throw error;
    }
    return res.json(matriculaAeronave);
  } catch (error) {
    next(error);
  }
});

aeronaveRouter.get("/matricula/:matricula", async (req, res, next) => {
  const { matricula } = req.params;
  try {
    const matriculaAeronave = await MatriculaAeronave.findOne({
      matriculaAeronave: matricula,
    }).populate("empresa");

    if (!matriculaAeronave) {
      const error = new Error();
      error.status = 404;
      error.name = "MatriculaNotFound";
      throw error;
    }
    return res.json(matriculaAeronave);
  } catch (error) {
    next(error);
  }
});

aeronaveRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const { matriculaAeronave, empresa } = body;
    const requiredFields = ["matriculaAeronave", "empresa"];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      const error = new Error(
        `Missing required fields: ${missingFields
          .map((field) => field.toUpperCase())
          .join(", ")}`
      );
      error.status = 400;
      error.name = "MissingData";
      throw error;
    }
    const empresaExists = await Empresa.findById(empresa);
    if (empresaExists === null) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }

    const newMat = new MatriculaAeronave({
      matriculaAeronave,
      empresa,
    });

    const savedMat = await newMat.save();
    return res.status(201).json(savedMat);
  } catch (error) {
    next(error);
  }
});

aeronaveRouter.post("/busqueda", async (req, res, next) => {
  const { body } = req;

  try {
    const { empresa } = body;

    const requiredFields = ["empresa"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      const error = new Error(
        `Missing required fields: ${missingFields
          .map((field) => field.toUpperCase())
          .join(", ")}`
      );
      error.status = 400;
      error.name = "MissingData";
      throw error;
    }

    const empresaRes = await Empresa.findById(empresa);

    if (empresaRes === null) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }

    const matriculas = await MatriculaAeronave.find({
      empresa: empresa,
    }).populate("empresa");

    return res.json(matriculas);
  } catch (error) {
    next(error);
  }
});

export default aeronaveRouter;
