import express from "express";
import { Aeropuerto } from "../../models/personalModel.js";

const aeropuertoRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().select();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

aeropuertoRouter.get("/", async (req, res) => {
  const aeropuerto = await fetchOptions(Aeropuerto);
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

export default aeropuertoRouter;
