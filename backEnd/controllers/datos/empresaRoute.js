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
      empresa: empresa.toUpperCase(),
      tipoEmpresa,
      isUserCreated: true,
      needsValidation: true,
    });

    const savedEmpresa = await newEmpresa.save();

    return res.status(201).json(savedEmpresa);
  } catch (error) {
    next(error);
  }
});

empresaRouter.get("/userCreatedEmpresas", async (req, res, next) => {
  try {
    const userCreatedEmpresas = await Empresa.find({
      isUserCreated: true,
      needsValidation: false,
    }).sort({ createdAt: -1 });

    return res.json(userCreatedEmpresas);
  } catch (error) {
    next(error);
  }
});

empresaRouter.patch("/:id/needsValidation", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isValid, realEmpresa } = req.body;

    const empresa = await Empresa.findById(id);
    if (!empresa) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }

    if (!empresa.isUserCreated) {
      const error = new Error("This airport is not a system-generated airport");
      error.status = 400;
      error.name = "InvalidOperation";
      throw error;
    }

    if (isValid && realEmpresa) {
      empresa.empresa = realEmpresa.toUpperCase();
      empresa.isUserCreated = false;
      empresa.needsValidation = false;
      const updatedEmpresa = await empresa.save();
      return res.json(updatedEmpresa);
    } else {
      await Empresa.findByIdAndDelete(id);
      return res.json({
        message: "Empresa Eliminada: inválida o rechazada",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default empresaRouter;
