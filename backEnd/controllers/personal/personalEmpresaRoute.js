import express from "express";
import {
  PersonalEmpresa,
  Empresa,
  PersonalSeguridadEmpresa,
} from "../../models/personalModel.js";

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

    const existingPersonal = await PersonalEmpresa.findOne({
      legajo,
      empresa,
    }).populate("empresa");

    if (existingPersonal) {
      const error = new Error();
      error.status = 409;
      error.name = "PersonalRegistrado";
      error.message = `El Legajo ${legajo} ya esta registrado en la empresa ${existingPersonal.empresa.empresa} con el nombre de ${existingPersonal.firstname} ${existingPersonal.lastname}`;
      throw error;
    }

    const newPersonal = new PersonalEmpresa({
      dni,
      firstname: firstname.trim().toUpperCase(),
      lastname: lastname.trim().toUpperCase(),
      empresa,
      legajo,
      isUserCreated: true,
      needsValidation: true,
    });

    const savedPersonal = await newPersonal.save();
    const populatedPersonal = await PersonalEmpresa.findById(
      savedPersonal.id
    ).populate("empresa");
    return res.status(201).json(populatedPersonal);
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
    const personalSeguridadEncontrado = await PersonalSeguridadEmpresa.findOne({
      dni: dni,
    }).populate("empresa");

    if (personalSeguridadEncontrado !== null) {
      const personalInEmpresa =
        personalSeguridadEncontrado.empresa.id !== empresa;

      if (personalInEmpresa) {
        const error = new Error();
        error.status = 404;
        error.name = "PersonalRegistrado";
        error.message = `El DNI ${dni} ya esta registrado en la empresa ${personalSeguridadEncontrado.empresa.empresa} con el nombre de ${personalSeguridadEncontrado.firstname} ${personalSeguridadEncontrado.lastname}`;
        throw error;
      }
    }

    const personalEncontrado = await PersonalEmpresa.findOne({
      dni: dni,
    }).populate("empresa");

    if (personalEncontrado !== null) {
      const personalInEmpresa = personalEncontrado.empresa.id !== empresa;

      if (personalInEmpresa) {
        const error = new Error();
        error.status = 404;
        error.name = "PersonalRegistrado";
        error.message = `El DNI ${dni} ya esta registrado en la empresa ${personalEncontrado.empresa.empresa} con el nombre de ${personalEncontrado.firstname} ${personalEncontrado.lastname}`;
        throw error;
      }
    }

    return res.status(200).json(personalEncontrado);
  } catch (err) {
    next(err);
  }
});

export default personalEmpresaRouter;
