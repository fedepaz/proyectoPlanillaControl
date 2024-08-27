import express from "express";
import { Planilla } from "../models/planillaModel.js";
import {
  TipoControl,
  MediosTec,
  TipoPro,
  Demora,
  TipoVuelo,
  Funcion,
} from "../models/opcionesModel.js";

const planillasRouter = express.Router();

planillasRouter.post("/", async (req, res, next) => {
  const {
    datosPsa,
    datosVuelo,
    datosTerrestre,
    datosSeguridad,
    datosVehiculos,
    novEquipajes,
    novInspeccion,
    novOtras,
  } = req.body;

  if (
    !datosPsa ||
    !datosVuelo ||
    !datosTerrestre ||
    !datosSeguridad ||
    !datosVehiculos ||
    !novEquipajes ||
    !novInspeccion ||
    !novOtras
  ) {
    return res.status(400).json({
      message: "Please provide all required fields for Planilla creation.",
    });
  }

  const newPlanilla = new Planilla({
    datosPsa,
    datosVuelo,
    datosTerrestre,
    datosSeguridad,
    datosVehiculos,
    novEquipajes,
    novInspeccion,
    novOtras,
  });

  const savedPlanilla = newPlanilla.save();

  return res.status(201).json(savedPlanilla);
});

planillasRouter.get("/", async (req, res) => {
  const planillas = await Planilla.find({});
  return res.json({
    count: planillas.length,
    data: planillas,
  });
});

planillasRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const planilla = await Planilla.findById(id);
  return res.json(planilla);
});

planillasRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    datosPsa,
    datosVuelo,
    datosTerrestre,
    datosSeguridad,
    datosVehiculos,
    novEquipajes,
    novInspeccion,
    novOtras,
  } = req.body;

  if (
    !datosPsa ||
    !datosVuelo ||
    !datosTerrestre ||
    !datosSeguridad ||
    !datosVehiculos ||
    !novEquipajes ||
    !novInspeccion ||
    !novOtras
  ) {
    return res.status(400).json({
      message: "Please provide all required fields for Planilla update.",
    });
  }

  const result = await Planilla.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    return res.status(404).send({
      message: "Planilla not found",
    });
  }
  return res.send({ message: "Planilla updated successfully", data: result });
});

planillasRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Planilla.findByIdAndDelete(id);
  if (!id) {
    return res.status(404).send({
      message: "Planilla not found",
    });
  }
  return res.send({ message: "Planilla Deleted" });
});

export default planillasRouter;
