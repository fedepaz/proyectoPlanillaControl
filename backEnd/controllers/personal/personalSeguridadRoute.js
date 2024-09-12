import express from "express";
import { PersonalSeguridadEmpresa } from "../../models/personalModel.js";

const personalSeguridadRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

personalSeguridadRouter.get("/", async (req, res) => {
  const personalSeguridadEmpresa = await fetchOptions(PersonalSeguridadEmpresa);
  res.json(personalSeguridadEmpresa);
});
personalSeguridadRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const personal = await PersonalSeguridadEmpresa.findById(id);
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

personalSeguridadRouter.get("/dni/:dni", async (req, res, next) => {
  const { dni } = req.params;
  try {
    const personal = await PersonalSeguridadEmpresa.findOne({
      dni: dni,
    });
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

personalSeguridadRouter.post("/", async (req, res, next) => {
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

    const newPersonal = new PersonalSeguridadEmpresa({
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

export default personalSeguridadRouter;
