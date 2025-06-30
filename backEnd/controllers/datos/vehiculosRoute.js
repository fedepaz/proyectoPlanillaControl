import express from "express";
import { Vehiculo, Empresa } from "../../models/personalModel.js";
import { TipoVehiculo } from "../../models/opcionesModel.js";

const vehiculoRouter = express.Router();

vehiculoRouter.get("/", async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.find().populate("empresa");
    res.json(vehiculo);
  } catch (error) {
    next(error);
  }
});

vehiculoRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehiculo = await Vehiculo.findById(id).populate("empresa");
    if (!vehiculo) {
      const error = new Error();
      error.status = 404;
      error.name = "VehiculoNotFound";
      throw error;
    }
    return res.json(vehiculo);
  } catch (error) {
    next(error);
  }
});

vehiculoRouter.get("/empresaID/:empresaID", async (req, res, next) => {
  const { empresaID } = req.params;
  try {
    const vehiculos = await Vehiculo.find({
      empresa: empresaID,
    }).populate("empresa");
    if (!vehiculos) {
      const error = new Error();
      error.status = 404;
      error.name = "VehiculoNotFound";
      throw error;
    }
    return res.json(vehiculos);
  } catch (error) {
    next(error);
  }
});

vehiculoRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const { numInterno, empresa, tipoVehiculo } = body;
    const requiredFields = ["numInterno", "empresa", "tipoVehiculo"];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      const error = new Error();
      error.status = 400;
      error.name = "MissingData";
      error.message = `Missing required fields: ${missingFields
        .map((field) => field.toUpperCase())
        .join(", ")}`;
      throw error;
    }
    const empresaExists = await Empresa.findById(empresa);
    const tipoVehiculoExists = await TipoVehiculo.findById(tipoVehiculo);
    const tipoHandling = "66b62e906984c8d2498ac3d1";
    if (empresaExists === null) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }
    const tipoEmpresaIdHex = empresaExists.tipoEmpresa.id.toString("hex");

    if (tipoEmpresaIdHex !== tipoHandling) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotMatching";
      throw error;
    }

    if (tipoVehiculoExists === null) {
      const error = new Error();
      error.status = 404;
      error.name = "TipoVehiculoNotFound";
      throw error;
    }

    const vehiculoExists = await Vehiculo.findOne({
      numInterno,
      empresa,
      tipoVehiculo,
    })
      .populate("tipoVehiculo")
      .populate("empresa");

    if (vehiculoExists) {
      const error = new Error();
      error.status = 409;
      error.name = "VehiculoAlreadyExists";
      error.message = `Vehiculo ${numInterno} already exists`;
      throw error;
    }

    const newVehiculo = new Vehiculo({
      numInterno,
      empresa,
      tipoVehiculo,
      isUserCreated: true,
      needsValidation: true,
    });
    const savedVehiculo = await newVehiculo.save();
    const populatedVehiculo = await Vehiculo.findById(savedVehiculo.id)
      .populate("tipoVehiculo")
      .populate("empresa");
    return res.status(201).json(populatedVehiculo);
  } catch (error) {
    next(error);
  }
});

vehiculoRouter.post("/busqueda", async (req, res, next) => {
  const { body } = req;

  try {
    const { empresa, numInterno } = body;

    const requiredFields = ["empresa", "numInterno"];
    const missingFields = requiredFields.filter((field) => !body[field]);

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

    const empresaExist = await Empresa.findById(empresa);
    if (!empresaExist) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }
    const vehiculoEncontrado = await Vehiculo.findOne({
      numInterno: numInterno,
      empresa: empresa,
    })
      .populate("empresa")
      .populate("tipoVehiculo");

    return res.status(200).json(vehiculoEncontrado);
  } catch (error) {
    next(error);
  }
});

export default vehiculoRouter;
