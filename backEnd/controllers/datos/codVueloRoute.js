import express from "express";
const CodVuelo = require("../../models/personalModel");

const codVueloRouter = express.Router();

codVueloRouter.get("/", async (req, res) => {
  const codVuelo = await CodVuelo.find();

  res.json(codVuelo);
});

codVueloRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const codVuelo = await CodVuelo.findById(id);
  return res.json(codVuelo);
});

codVueloRouter.get("/codVuelo/:codVuelo", async (req, res) => {
  const { codigo } = req.params;
  const codVuelo = await CodVuelo.findOne({
    codvuelo: codigo,
  });

  if (!codVuelo) {
    return res.status(404).json({ message: "No codVuelo" });
  }
  return res.json(codVuelo);
});

codVueloRouter.post("/", async (req, res) => {
  const { body } = req;
  const { codVuelo, origen, destino, empresa } = body;
  if (!codVuelo || !origen || !destino || !empresa) {
    return res.status(400).json({
      message: "Faltan datos de Vuelo",
    });
  }

  const newCodVuelo = new CodVuelo({
    codVuelo,
    origen,
    destino,
    empresa,
  });

  const savedCodVuelo = await newCodVuelo.save();
  return res.status(201).json(savedCodVuelo);
});

module.exports = codVueloRouter;
