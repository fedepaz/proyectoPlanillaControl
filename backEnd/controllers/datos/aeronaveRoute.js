import express from "express";
import { MatriculaAeronave, Empresa } from "../../models/personalModel.js";

const aeronaveRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

aeronaveRouter.get("/", async (req, res) => {
  const matriculaAeronave = await fetchOptions(MatriculaAeronave);
  res.json(matriculaAeronave);
});

aeronaveRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const matriculaAeronave = await MatriculaAeronave.findById(id);
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
    });
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

export default aeronaveRouter;
