import express from "express";
const Aeropuerto = require("../../models/personalModel");

const aeropuertoRouter = express.Router();

aeropuertoRouter.get("/", async (req, res) => {
  const aeropuerto = await Aeropuerto.find();

  res.json(aeropuerto);
});

aeropuertoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const aeropuerto = await Aeropuerto.findById(id);
  return res.json(aeropuerto);
});

aeropuertoRouter.get("/codIATA/:aero", async (req, res) => {
  const { aero } = req.params;
  const aeropuerto = await Aeropuerto.findOne({
    codIATA: aero.toUpperCase(),
  });

  if (!aeropuerto) {
    return res.status(404).json({ message: "No aeropuerto" });
  }
  return res.json(aeropuerto);
});

aeropuertoRouter.post("/", async (req, res) => {
  const { body } = req;
  const { aeropuerto, codIATA, codOACI } = body;
  if (!aeropuerto || !codIATA || !codOACI) {
    return res.status(400).json({
      message: "Faltan datos de Aeropuerto",
    });
  }

  const newAero = new Aeropuerto({
    aeropuerto,
    codIATA,
    codOACI,
  });

  const savedAero = await newAero.save();
  return res.status(201).json(savedAero);
});

module.exports = aeropuertoRouter;
