import express from "express";
import { Empresa } from "../../models/personalModel.js";
import { TipoEmpresa } from "../../models/opcionesModel.js";

const empresaRouter = express.Router();

empresaRouter.get("/", async (req, res) => {
  const empresa = await Empresa.find({}).populate("tipoEmpresa");
  res.json(empresa);
});

empresaRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const empresa = await Empresa.findById(id).populate("tipoEmpresa");
    if (!empresa) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }
    return res.json(empresa);
  } catch (error) {
    next(error);
  }
});

empresaRouter.get("/tipoID/:tipo", async (req, res, next) => {
  const { tipo } = req.params;
  try {
    const empresa = await Empresa.find({ tipoEmpresa: tipo }).populate(
      "tipoEmpresa"
    );
    if (!empresa) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }
    return res.json(empresa);
  } catch (error) {
    next(error);
  }
});

empresaRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const { empresa, tipoEmpresa } = body;
    const requiredFields = ["empresa", "tipoEmpresa"];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      const error = new Error();
      error.status = 400;
      error.name = "MissingData";
      error.message = `Missing required fields: ${missingFields
        .map((field) => field.toUpperCase())
        .join(", ")}`;
      throw error;
    }
    const tipoExist = await TipoEmpresa.findById(tipoEmpresa);
    if (tipoExist === null) {
      const error = new Error();
      error.status = 404;
      error.name = "TipoEmpresaNotFound";
      throw error;
    }

    const newEmpresa = new Empresa({
      empresa,
      tipoEmpresa,
    });
    const savedEmpresa = await newEmpresa.save();
    return res.status(201).json(savedEmpresa);
  } catch (error) {
    next(error);
  }
});

export default empresaRouter;
