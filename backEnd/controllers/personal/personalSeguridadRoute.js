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
personalSeguridadRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const personal = await PersonalSeguridadEmpresa.findById(id);
  return res.json(personal);
});

personalSeguridadRouter.get("/dni/:dni", async (req, res) => {
  const { dni } = req.params;
  const personal = await PersonalSeguridadEmpresa.findOne({
    dni: dni,
  });

  if (!personal) {
    return res.status(404).json({ message: "No DNI" });
  }
  return res.json(personal);
});

personalSeguridadRouter.post("/", async (req, res) => {
  const { body } = req;
  const { dni, firstname, lastname, empresa, legajo } = body;
  if (!dni || !firstname || !lastname || !empresa || !legajo) {
    return res.status(400).json({
      message: "Faltan datos de Personal",
    });
  }

  const newPersonal = new PersonalSeguridadEmpresa({
    dni,
    firstname,
    lastname,
    empresa,
    legajo,
  });

  const savedPersonal = newPersonal.save();
  return res.status(201).json(savedPersonal);
});

export default personalSeguridadRouter;
