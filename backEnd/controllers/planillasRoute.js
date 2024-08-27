import express from "express";
import { Planilla } from "../schemas/planillaModel.js";
import {
  TipoControl,
  MediosTec,
  TipoPro,
  Demora,
  TipoVuelo,
  Funcion,
} from "../schemas/opcionesModel.js";

const router = express.Router();

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

router.post("/", async (req, res) => {
  try {
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
    const planilla = await Planilla.findById(id).exec();
    return res.status(200).json(planilla);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Planilla not found" });
  }
});

router.put("/:id", async (req, res) => {
  try {
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
    const result = await Planilla.findByIdAndDelete(id).exec();
    if (!result) {
      return res.status(404).send({
        message: "Planilla not found",
      });
    }
    return res.status(200).send({ message: "Planilla Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "ID don't exists..." });
  }
});

export default router;
