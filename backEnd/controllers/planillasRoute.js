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
import {
  Oficial,
  CodVuelo,
  MatriculaAeronave,
  PersonalEmpresa,
  PersonalSeguridadEmpresa,
  Empresa,
  Vehiculo,
} from "../models/personalModel.js";

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

planillasRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const {
      datosPsa: {
        fecha,
        responsable,
        horaIni,
        horaFin,
        cant,
        tipoControl,
        medioTec,
        tipoPro,
      },
      datosVuelo: {
        codVuelo,
        horaArribo,
        horaPartida,
        demora,
        tipoVuelo,
        matriculaAeronave,
        posicion,
      },
      datosTerrestre,
      datosSeguridad,
      datosVehiculos,
      novEquipajes,
      novInspeccion,
      novOtras,
    } = req.body;
    const requiredFields = [
      "datosPsa.fecha",
      "datosPsa.responsable",
      "datosPsa.horaIni",
      "datosPsa.horaFin",
      "datosPsa.cant",
      "datosPsa.tipoControl",
      "datosPsa.medioTec",
      "datosPsa.tipoPro",
      "datosVuelo.codVuelo",
      "datosVuelo.horaArribo",
      "datosVuelo.horaPartida",
      "datosVuelo.demora",
      "datosVuelo.tipoVuelo",
      "datosVuelo.matriculaAeronave",
      "datosVuelo.posicion",
      "novEquipajes",
      "novInspeccion",
      "novOtras",
    ];

    const missingFields = requiredFields.filter((field) => {
      const fieldParts = field.split(".");
      let value = body;
      for (const part of fieldParts) {
        value = value[part];
        if (value === undefined) return true;
      }
      return false;
    });

    if (missingFields.length > 0) {
      const error = new Error(
        `Missing required fields: ${missingFields
          .map((field) => field.toUpperCase())
          .join(", ")}`
      );
      error.status = 400;
      error.name = "MissingData";
      throw error;
    }

    const validateReference = async (model, id) => {
      const result = await model.findById(id);
      if (!result) {
        const error = new Error(`${model.modelName} with id ${id} not found`);
        error.status = 404;
        error.name = `NotFound`;
        throw error;
      }
    };

    // Validate all references
    await validateReference(Oficial, body.datosPsa.responsable);
    await validateReference(TipoControl, body.datosPsa.tipoControl);
    await validateReference(MediosTec, body.datosPsa.medioTec);
    await validateReference(TipoPro, body.datosPsa.tipoPro);
    await validateReference(CodVuelo, body.datosVuelo.codVuelo);
    await validateReference(Demora, body.datosVuelo.demora);
    await validateReference(TipoVuelo, body.datosVuelo.tipoVuelo);
    await validateReference(
      MatriculaAeronave,
      body.datosVuelo.matriculaAeronave
    );

    // Validate nested arrays (assuming they are arrays of IDs)
    for (const personalEmpresa of body.datosTerrestre) {
      await validateReference(PersonalEmpresa, personalEmpresa.personalEmpresa);
      await validateReference(Funcion, personalEmpresa.funcion);
    }

    for (const seguridad of body.datosSeguridad) {
      await validateReference(
        PersonalSeguridadEmpresa,
        seguridad.personalSegEmpresa
      );
      await validateReference(Empresa, seguridad.empresaSeguridad);
    }

    for (const vehiculo of body.datosVehiculos) {
      await validateReference(Vehiculo, vehiculo.vehiculo);
      await validateReference(PersonalEmpresa, vehiculo.operadorVehiculo);
    }

    const newPlanilla = new Planilla({
      datosPsa: {
        fecha,
        responsable,
        horaIni,
        horaFin,
        cant,
        tipoControl,
        medioTec,
        tipoPro,
      },
      datosVuelo: {
        codVuelo,
        horaArribo,
        horaPartida,
        demora,
        tipoVuelo,
        matriculaAeronave,
        posicion,
      },
      datosTerrestre,
      datosSeguridad,
      datosVehiculos,
      novEquipajes,
      novInspeccion,
      novOtras,
    });

    const savedPlanilla = await newPlanilla.save();

    return res.status(201).json(savedPlanilla);
  } catch (error) {
    next(error);
  }
});

planillasRouter.get("/", async (req, res) => {
  const planillas = await Planilla.find({});
  return res.json({
    count: planillas.length,
    data: planillas,
  });
});

planillasRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const planilla = await Planilla.findById(id);
    if (!planilla) {
      const error = new Error();
      error.status = 404;
      error.name = "PlanillaNotFound";
      throw error;
    }
    return res.json(planilla);
  } catch (error) {
    next(error);
  }
});

planillasRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
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

    const result = await Planilla.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).send({
        message: "Planilla not found",
      });
    }
    return res.send({ message: "Planilla updated successfully", data: result });
  } catch (error) {
    next(error);
  }
});

planillasRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Planilla.findByIdAndDelete(id);
    if (!result) {
      const error = new Error();
      error.status = 404;
      error.name = "PlanillaNotFound";
      throw error;
    }
    return res.send({ message: "Planilla Deleted" });
  } catch (error) {
    next(error);
  }
});

export default planillasRouter;
