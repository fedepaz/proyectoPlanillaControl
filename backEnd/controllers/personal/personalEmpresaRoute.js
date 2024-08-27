import express from "express";
const PersonalEmpresa = require("../../models/personalModel");

const personalEmpresaRouter = express.Router();

personalEmpresaRouter.get("/", async (req, res) => {
  const personalEmpresa = await PersonalEmpresa.find();

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

module.exports = personalEmpresaRouter;
