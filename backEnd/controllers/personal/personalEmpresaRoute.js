import express from "express";
import { PersonalEmpresa } from "../../models/personalModel.js";

const personalEmpresaRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

personalEmpresaRouter.get("/", async (req, res) => {
  const personalEmpresa = await fetchOptions(PersonalEmpresa);
  res.json(personalEmpresa);
});

personalEmpresaRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const personal = await PersonalEmpresa.findById(id);
  return res.json(personal);
});

personalEmpresaRouter.get("/dni/:dni", async (req, res) => {
  const { dni } = req.params;
  const personal = await PersonalEmpresa.findOne({ dni: dni });

  if (!personal) {
    return res.status(404).json({ message: "No DNI" });
  }
  return res.json(personal);
});

personalEmpresaRouter.post("/", async (req, res) => {
  const { body } = req;
  const { dni, firstname, lastname, empresa, legajo } = body;
  if (!dni || !firstname || !lastname || !empresa || !legajo) {
    return res.status(400).json({
      message: "Faltan datos de Personal",
    });
  }

  const newPersonal = new PersonalEmpresa({
    dni,
    firstname,
    lastname,
    empresa,
    legajo,
  });

  const savedPersonal = newPersonal.save();
  return res.status(201).json(savedPersonal);
});

export default personalEmpresaRouter;
