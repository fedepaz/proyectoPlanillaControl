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

const router = express.Router();

const fetchOptions = async (model) => {
  const options = await model.find().select("value -_id").exec();
  return options.map((option) => option.value);
};

const validateOptions = (field, value, validOptions) => {
  if (!validOptions.includes(value)) {
    throw new Error(`Invalid value for ${field}`);
  }
};

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

    // Fetch valid options from the database
    const validTipoControl = await fetchOptions(TipoControl);
    const validMediosTec = await fetchOptions(MediosTec);
    const validTipoPro = await fetchOptions(TipoPro);
    const validDemora = await fetchOptions(Demora);
    const validTipoVuelo = await fetchOptions(TipoVuelo);
    const validFuncion = await fetchOptions(Funcion);

    // Validate fields
    validateOptions("tipoControl", datosPsa.tipoControl, validTipoControl);
    validateOptions("medioTec", datosPsa.medioTec, validMediosTec);
    validateOptions("tipoPro", datosPsa.tipoPro, validTipoPro);
    validateOptions("demora", datosVuelo.demora, validDemora);
    validateOptions("tipo", datosVuelo.tipo, validTipoVuelo);

    datosTerrestre.forEach((item) =>
      validateOptions("funcion", item.funcion, validFuncion)
    );

    // Create and save the Planilla
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

router.get("/", async (req, res) => {
  try {
    const planillas = await Planilla.find({}).exec();
    return res.status(200).json({
      count: planillas.length,
      data: planillas,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const planilla = await Planilla.findById(id);
    return res.status(200).json(planilla);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
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
        message: "Please provide all required fields for Planilla update.",
      });
    }

    // Fetch valid options from the database
    const validTipoControl = await fetchOptions(TipoControl);
    const validMediosTec = await fetchOptions(MediosTec);
    const validTipoPro = await fetchOptions(TipoPro);
    const validDemora = await fetchOptions(Demora);
    const validTipoVuelo = await fetchOptions(TipoVuelo);
    const validFuncion = await fetchOptions(Funcion);

    // Validate fields
    validateOptions("tipoControl", datosPsa.tipoControl, validTipoControl);
    validateOptions("medioTec", datosPsa.medioTec, validMediosTec);
    validateOptions("tipoPro", datosPsa.tipoPro, validTipoPro);
    validateOptions("demora", datosVuelo.demora, validDemora);
    validateOptions("tipo", datosVuelo.tipo, validTipoVuelo);

    datosTerrestre.forEach((item) =>
      validateOptions("funcion", item.funcion, validFuncion)
    );

    const { id } = req.params;
    const result = await Planilla.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).send({
        message: "Planilla not found",
      });
    }
    return res
      .status(200)
      .send({ message: "Planilla updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Planilla.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        message: "Planilla not found",
      });
    }
    return res.status(200).send({ message: "Planilla Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
