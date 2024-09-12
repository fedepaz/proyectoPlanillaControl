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

const optionsFetcher = (model) => {
  switch (model.modelName) {
    case "TipoControl":
      return ["option1", "Personas"];
    case "MediosTec":
      return ["option3", "Otros"];
    case "TipoPro":
      return ["Rutina", "option6"];
    case "Demora":
      return ["SI", "NO"];
    case "TipoVuelo":
      return ["Arribo", "Partida"];
    case "Funcion":
      return ["Bodega", "Otro"];
    default:
      return [];
  }
};

export const fetchOptions = async (model) => {
  if (process.env.NODE_ENV === "test") {
    return optionsFetcher(model);
  }
  const options = await model.find().select("label -_id").exec();
  return options.map((option) => option.label);
};

export const validateOptions = (field, value, validOptions) => {
  if (!validOptions.includes(value)) {
    console.log(validOptions);
    throw new Error(`Invalid value = ${value}, ${typeof value} for ${field}`);
  }
};

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
  const validTipoControl = await fetchOptions(TipoControl);
  const validMediosTec = await fetchOptions(MediosTec);
  const validTipoPro = await fetchOptions(TipoPro);
  const validDemora = await fetchOptions(Demora);
  const validTipoVuelo = await fetchOptions(TipoVuelo);
  const validFuncion = await fetchOptions(Funcion);

  validateOptions("tipoControl", datosPsa.tipoControl, validTipoControl);
  validateOptions("medioTec", datosPsa.medioTec, validMediosTec);
  validateOptions("tipoPro", datosPsa.tipoPro, validTipoPro);
  validateOptions("demora", datosVuelo.demora, validDemora);
  validateOptions("tipoVuelo", datosVuelo.tipoVuelo, validTipoVuelo);

  datosTerrestre.forEach((item) =>
    validateOptions("funcion", item.funcion, validFuncion)
  );

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
