import express from "express";
import { Planilla } from "../models/planillaModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Destructure required fields from request body
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

    // Check if all required fields are present in the request body
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
    const newPlanilla = await Planilla.create({
      datosPsa,
      datosVuelo,
      datosTerrestre,
      datosSeguridad,
      datosVehiculos,
      novEquipajes,
      novInspeccion,
      novOtras,
    });

    return res.status(201).json(newPlanilla);
  } catch (error) {
    console.error("Error creating Planilla:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (request, response) => {
  try {
    const planillas = await Planilla.find({});
    return response.status(200).json({
      count: planillas.length,
      data: planillas,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const planilla = await Planilla.findById(id);
    return response.status(200).json(planilla);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    // Destructure required fields from request body
    const {
      datosPsa,
      datosVuelo,
      datosTerrestre,
      datosSeguridad,
      datosVehiculos,
      novEquipajes,
      novInspeccion,
      novOtras,
    } = request.body;

    // Check if all required fields are present in the request body
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
      return response.status(400).json({
        message: "Please provide all required fields for Planilla creation.",
      });
    }
    const { id } = request.params;
    const result = await Planilla.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({
        message: "Planilla not found",
      });
    }
    return response
      .status(200)
      .send({ message: "Planilla updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Planilla.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({
        message: "Planilla not found",
      });
    }
    return response.status(200).send({ message: "Planilla Deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
