import express from "express";
import { Vehiculo } from "../../models/personalModel.js";

const vehiculoRouter = express.Router();

vehiculoRouter.get("/", async (req, res) => {
  const vehiculo = await Vehiculo.find();

  res.json(vehiculo);
});

vehiculoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const vehiculo = await Vehiculo.findById(id);
  return res.json(vehiculo);
});

vehiculoRouter.get("/numInterno/:interno", async (req, res) => {
  const { interno } = req.params;
  const numInterno = await Vehiculo.findOne({
    numInterno: interno,
  });

  if (!numInterno) {
    return res.status(404).json({ message: "No numInterno" });
  }
  return res.json(numInterno);
});

vehiculoRouter.post("/", async (req, res) => {
  const { body } = req;
  const { numInterno, empresa, tipoVehiculo } = body;
  if (!numInterno || !empresa || !tipoVehiculo) {
    return res.status(400).json({
      message: "Faltan datos de Vehiculo",
    });
  }

  const newVehiculo = new Vehiculo({
    numInterno,
    empresa,
    tipoVehiculo,
  });

  const savedVehiculo = newVehiculo.save();
  return res.status(201).json(savedVehiculo);
});

export default vehiculoRouter;
