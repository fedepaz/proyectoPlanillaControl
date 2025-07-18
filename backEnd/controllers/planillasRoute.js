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
import { validateReference } from "../utils/validateReference.js";
import { getPopulateFields } from "../utils/populateHelper.js";
import {
  buildDateRangeQuery,
  validateDateFormat,
} from "../utils/dateParser.js";
import { authorize } from "../middlewares/authorize.js";

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
        tipoVuelo,
        empresa,
        codVuelo,
        horaArribo,
        horaPartida,
        demora,
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
      "datosVuelo.tipoVuelo",
      "datosVuelo.empresa",
      "datosVuelo.codVuelo",
      "datosVuelo.demora",
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

    // Validate single references
    await validateReference(Oficial, body.datosPsa.responsable);
    await validateReference(Empresa, body.datosVuelo.empresa);
    await validateReference(CodVuelo, body.datosVuelo.codVuelo);
    await validateReference(Demora, body.datosVuelo.demora);
    await validateReference(TipoVuelo, body.datosVuelo.tipoVuelo);
    await validateReference(
      MatriculaAeronave,
      body.datosVuelo.matriculaAeronave
    );

    // Validate array references in datosPsa
    for (const tipoControlId of body.datosPsa.tipoControl) {
      await validateReference(TipoControl, tipoControlId);
    }
    for (const medioTecId of body.datosPsa.medioTec) {
      await validateReference(MediosTec, medioTecId);
    }
    for (const tipoProId of body.datosPsa.tipoPro) {
      await validateReference(TipoPro, tipoProId);
    }

    // Validate datosTerrestre array
    if (Array.isArray(body.datosTerrestre)) {
      for (const terrestre of body.datosTerrestre) {
        await validateReference(PersonalEmpresa, terrestre.personalEmpresa);
        await validateReference(Funcion, terrestre.funcion);

        // Validate grupo field
        if (!terrestre.grupo || terrestre.grupo.trim() === "") {
          const error = new Error(
            "Grupo is required for datosTerrestre entries"
          );
          error.name = "MissingData";
          throw error;
        }
      }
    }

    // Validate datosSeguridad array
    if (Array.isArray(body.datosSeguridad)) {
      for (const seguridad of body.datosSeguridad) {
        // personalSegEmpresa is an array of IDs
        for (const personalId of seguridad.personalSegEmpresa) {
          await validateReference(PersonalSeguridadEmpresa, personalId);
        }
        await validateReference(Empresa, seguridad.empresaSeguridad);
      }
    }
    // Validate datosVehiculos array
    if (Array.isArray(body.datosVehiculos)) {
      for (const vehiculo of body.datosVehiculos) {
        await validateReference(Vehiculo, vehiculo.vehiculo);
        await validateReference(PersonalEmpresa, vehiculo.operadorVehiculo);
      }
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
        tipoVuelo,
        empresa,
        codVuelo,
        horaArribo,
        horaPartida,
        demora,
        matriculaAeronave,
        posicion,
      },
      datosTerrestre,
      datosSeguridad,
      datosVehiculos,
      novEquipajes,
      novInspeccion,
      novOtras,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });

    const savedPlanilla = await newPlanilla.save();

    return res.status(201).json(savedPlanilla);
  } catch (error) {
    next(error);
  }
});

// Helper function to determine if user should see all planillas
const shouldShowAllPlanillas = (userRole) => {
  // Define roles that can see all planillas
  const adminRoles = ["admin", "supervisor", "manager"]; // Adjust these to match your role names
  return adminRoles.includes(userRole);
};

// GET all planillas - filtered by user or role
planillasRouter.get("/", async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      empresa,
      fechaDesde,
      fechaHasta,
      populate,
    } = req.query;

    // Validate dates
    if (
      (fechaDesde && !validateDateFormat(fechaDesde)) ||
      (fechaHasta && !validateDateFormat(fechaHasta))
    ) {
      const error = new Error("Invalid date format. Use YYYY-MM-DD");
      error.status = 400;
      error.name = "BadRequest";
      throw error;
    }

    // Build base query for non-date fields
    const query = {};
    if (empresa) query["datosVuelo.empresa"] = empresa;

    // Add user filtering based on role
    if (!shouldShowAllPlanillas(req.user.role)) {
      query.createdBy = req.user.id;
    }

    // If we have date filters, we need to use aggregation
    if (fechaDesde || fechaHasta) {
      const pipeline = [
        ...buildDateRangeQuery(fechaDesde, fechaHasta),
        { $match: query }, // Add other filters including user filter
        { $sort: { createdAt: -1 } },
      ];

      // Get total count
      const countPipeline = [...pipeline, { $count: "totalCount" }];
      const totalResult = await Planilla.aggregate(countPipeline);
      const totalCount = totalResult[0]?.totalCount || 0;

      // Add pagination
      const validPage = Math.max(1, parseInt(page));
      const pageSizeInt = parseInt(pageSize, 10);
      const totalPages = Math.ceil(totalCount / pageSizeInt);

      pipeline.push(
        { $skip: (validPage - 1) * pageSizeInt },
        { $limit: pageSizeInt },
        { $addFields: { id: "$_id" } }, // Add id field
        { $unset: ["parsedDate", "_id"] } // Remove unwanted fields
      );

      let planillas = await Planilla.aggregate(pipeline);

      // Handle population
      const populatedArray = getPopulateFields(
        typeof populate === "string" ? populate.split(",") : []
      );

      if (populatedArray.length > 0) {
        planillas = await Planilla.populate(planillas, populatedArray);
      }

      return res.json({
        data: planillas,
        currentPage: validPage,
        totalPages,
        totalCount,
        pageSize: pageSizeInt,
      });
    } else {
      // No date filtering, use regular Mongoose query
      const totalCount = await Planilla.countDocuments(query);
      const totalPages = Math.ceil(totalCount / pageSize);
      const validPage = Math.min(Math.max(1, page), totalPages) || 1;

      const populatedArray = getPopulateFields(
        typeof populate === "string" ? populate.split(",") : []
      );

      let planillaQuery = Planilla.find(query)
        .sort({ createdAt: -1 })
        .skip((validPage - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize, 10));

      for (const field of populatedArray) {
        planillaQuery = planillaQuery.populate(field);
      }

      const planillas = await planillaQuery.exec();

      return res.json({
        data: planillas,
        currentPage: validPage,
        totalPages,
        totalCount,
        pageSize: parseInt(pageSize, 10),
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET single planilla by ID - filtered by user or role
planillasRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // Build query with user filtering
    const query = { _id: id };
    if (!shouldShowAllPlanillas(req.user.role)) {
      query.createdBy = req.user.id;
    }

    const planilla = await Planilla.findOne(query)
      .populate({
        path: "datosPsa.responsable",
        select: "firstname lastname dni legajo",
        populate: {
          path: "jerarquiaId",
          select: "label",
        },
      })
      .populate({ path: "datosPsa.tipoControl", select: "label" })
      .populate({ path: "datosPsa.medioTec", select: "label" })
      .populate({ path: "datosPsa.tipoPro", select: "label" })
      .populate({
        path: "datosVuelo.codVuelo",
        select: "codVuelo origen destino",
        populate: [
          {
            path: "origen",
            select: "aeropuerto codIATA codOACI",
          },
          {
            path: "destino",
            select: "aeropuerto codIATA codOACI",
          },
        ],
      })
      .populate({
        path: "datosVuelo.demora",
        select: "label",
      })
      .populate({
        path: "datosVuelo.tipoVuelo",
        select: "label",
      })
      .populate({
        path: "datosVuelo.matriculaAeronave",
        select: "matriculaAeronave",
      })
      .populate({ path: "datosVuelo.empresa", select: "empresa" })
      .populate({
        path: "datosTerrestre.personalEmpresa",
        select: "firstname lastname dni legajo empresa",
        populate: {
          path: "empresa",
          select: "empresa",
        },
      })
      .populate({
        path: "datosTerrestre.funcion",
        select: "label",
      })
      .populate({
        path: "datosSeguridad.personalSegEmpresa",
        select: "firstname lastname dni legajo",
      })
      .populate({
        path: "datosSeguridad.empresaSeguridad",
        select: "empresa",
      })
      .populate({
        path: "datosVehiculos.vehiculo",
        select: "numInterno tipoVehiculo empresa",
        populate: [
          {
            path: "tipoVehiculo",
            select: "label",
          },
          {
            path: "empresa",
            select: "empresa",
          },
        ],
      })
      .populate({
        path: "datosVehiculos.operadorVehiculo",
        select: "firstname lastname dni legajo",
      });

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

// PUT update planilla - only allow users to update their own planillas
planillasRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    // Build query with user filtering
    const query = { _id: id };
    if (!shouldShowAllPlanillas(req.user.role)) {
      query.createdBy = req.user.id;
    }

    const planilla = await Planilla.findOne(query);
    if (!planilla) {
      const error = new Error();
      error.status = 404;
      error.name = "PlanillaNotFound";
      throw error;
    }

    const requiredFields = [
      "datosPsa.fecha",
      "datosPsa.responsable",
      "datosPsa.horaIni",
      "datosPsa.horaFin",
      "datosPsa.cant",
      "datosPsa.tipoControl",
      "datosPsa.medioTec",
      "datosPsa.tipoPro",
      "datosVuelo.empresa",
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

    // Validate all references
    await validateReference(Oficial, body.datosPsa.responsable);
    await validateReference(Empresa, body.datosVuelo.empresa);
    await validateReference(CodVuelo, body.datosVuelo.codVuelo);
    await validateReference(Demora, body.datosVuelo.demora);
    await validateReference(TipoVuelo, body.datosVuelo.tipoVuelo);
    await validateReference(
      MatriculaAeronave,
      body.datosVuelo.matriculaAeronave
    );

    // Validate nested arrays (assuming they are arrays of IDs)
    for (const tipoControlId of body.datosPsa.tipoControl) {
      await validateReference(TipoControl, tipoControlId);
    }
    for (const medioTecId of body.datosPsa.medioTec) {
      await validateReference(MediosTec, medioTecId);
    }
    for (const tipoProId of body.datosPsa.tipoPro) {
      await validateReference(TipoPro, tipoProId);
    }

    // Validate datosTerrestre array
    for (const terrestre of body.datosTerrestre) {
      await validateReference(PersonalEmpresa, terrestre.personalEmpresa);
      await validateReference(Funcion, terrestre.funcion);

      // Validate grupo field
      if (!terrestre.grupo || terrestre.grupo.trim() === "") {
        const error = new Error("Grupo is required for datosTerrestre entries");
        error.name = "MissingData";
        throw error;
      }
    }

    // Validate datosSeguridad array
    for (const seguridad of body.datosSeguridad) {
      // personalSegEmpresa is an array of IDs
      for (const personalId of seguridad.personalSegEmpresa) {
        await validateReference(PersonalSeguridadEmpresa, personalId);
      }
      await validateReference(Empresa, seguridad.empresaSeguridad);
    }

    // Validate datosVehiculos array
    for (const vehiculo of body.datosVehiculos) {
      await validateReference(Vehiculo, vehiculo.vehiculo);
      await validateReference(PersonalEmpresa, vehiculo.operadorVehiculo);
    }
    const updateData = {
      datosPsa: {
        fecha: body.datosPsa.fecha,
        responsable: body.datosPsa.responsable,
        horaIni: body.datosPsa.horaIni,
        horaFin: body.datosPsa.horaFin,
        cant: body.datosPsa.cant,
        tipoControl: body.datosPsa.tipoControl,
        medioTec: body.datosPsa.medioTec,
        tipoPro: body.datosPsa.tipoPro,
      },
      datosVuelo: {
        empresa: body.datosVuelo.empresa,
        codVuelo: body.datosVuelo.codVuelo,
        horaArribo: body.datosVuelo.horaArribo,
        horaPartida: body.datosVuelo.horaPartida,
        demora: body.datosVuelo.demora,
        tipoVuelo: body.datosVuelo.tipoVuelo,
        matriculaAeronave: body.datosVuelo.matriculaAeronave,
        posicion: body.datosVuelo.posicion,
      },
      datosTerrestre: body.datosTerrestre,
      datosSeguridad: body.datosSeguridad,
      datosVehiculos: body.datosVehiculos,
      novEquipajes: body.novEquipajes,
      novInspeccion: body.novInspeccion,
      novOtras: body.novOtras,
      updatedBy: req.user.id,
    };

    const updated = await Planilla.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.send({
      message: "Planilla updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE planilla - only allow users to delete their own planillas
planillasRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // Build query with user filtering
    const query = { _id: id };
    if (!shouldShowAllPlanillas(req.user.role)) {
      query.createdBy = req.user.id;
    }

    const result = await Planilla.findOneAndDelete(query);
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
