import express from "express";
import { PersonalEmpresa, Empresa } from "../../models/personalModel.js";

const personalEmpresaRouter = express.Router();

personalEmpresaRouter.get("/", async (req, res, next) => {
  try {
    const personalEmpresa = await PersonalEmpresa.find()
      .populate("empresa")
      .exec();
    res.json(personalEmpresa);
  } catch (err) {
    next(err);
  }
});

personalEmpresaRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const personal = await PersonalEmpresa.findById(id).populate("empresa");
    if (!personal) {
      const error = new Error();
      error.status = 404;
      error.name = "PersonalNotFound";
      throw error;
    }
    return res.json(personal);
  } catch (err) {
    next(err);
  }
});

personalEmpresaRouter.get("/dni/:dni", async (req, res, next) => {
  const { dni } = req.params;
  try {
    const personal = await PersonalEmpresa.findOne({ dni: dni }).populate(
      "empresa"
    );
    if (!personal) {
      const error = new Error();
      error.status = 404;
      error.name = "PersonalNotFound";
      throw error;
    }
    return res.json(personal);
  } catch (err) {
    next(err);
  }
});

personalEmpresaRouter.get("/empresaID/:empresaID", async (req, res, next) => {
  const { empresaID } = req.params;
  try {
    const personal = await PersonalEmpresa.find({
      empresa: empresaID,
    }).populate("empresa");
    if (!personal) {
      const error = new Error();
      error.status = 404;
      error.name = "PersonalNotFound";
      throw error;
    }
    return res.json(personal);
  } catch (error) {
    next(error);
  }
});

personalEmpresaRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const { dni, firstname, lastname, empresa, legajo } = body;
    const requiredFields = [
      "dni",
      "firstname",
      "lastname",
      "empresa",
      "legajo",
    ];
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

    const newPersonal = new PersonalEmpresa({
      dni,
      firstname,
      lastname,
      empresa,
      legajo,
    });

    const savedPersonal = await newPersonal.save();
    return res.status(201).json(savedPersonal);
  } catch (err) {
    next(err);
  }
});

personalEmpresaRouter.post("/busqueda", async (req, res, next) => {
  const { body } = req;
  try {
    const { dni, empresa } = body;

    const requiredFields = ["dni", "empresa"];
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

    const personal = await PersonalEmpresa.find({
      dni: dni,
      empresa: empresa,
    }).populate("empresa");

    return res.json(personal);
  } catch (err) {
    next(err);
  }
});

export default personalEmpresaRouter;
