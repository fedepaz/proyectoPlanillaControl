import express from "express";
const Oficial = require("../../models/personalModel");

const oficialRouter = express.Router();

oficialRouter.get("/", async (req, res) => {
  const oficial = await Oficial.find();

  res.json(oficial);
});

oficialRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oficial = await Oficial.findById(id);
  return res.json(oficial);
});

oficialRouter.get("/dni/:dni", async (req, res) => {
  const { dni } = req.params;
  const oficial = await Oficial.findOne({ dni: dni });

  if (!oficial) {
    return res.status(404).json({ message: "No DNI" });
  }
  return res.json(oficial);
});

oficialRouter.post("/", async (req, res) => {
  const { body } = req;
  const { dni, firstname, lastname, legajo } = body;
  if (!dni || !firstname || !lastname || !legajo) {
    return res.status(400).json({
      message: "Faltan datos de Oficial",
    });
  }

  const newOficial = new Oficial({
    dni,
    firstname,
    lastname,
    legajo,
  });

  const savedOficial = newOficial.save();
  return res.status(201).json(savedOficial);
});

module.exports = oficialRouter;
