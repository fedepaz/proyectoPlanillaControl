import express from "express";
import { Vehiculo, Empresa } from "../../models/personalModel.js";

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
    if (empresaExists === null) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }

    const newVehiculo = new Vehiculo({
      numInterno,
      empresa,
      tipoVehiculo,
    });
    const savedVehiculo = await newVehiculo.save();
    return res.status(201).json(savedVehiculo);
  } catch (error) {
    next(error);
  }
});

export default vehiculoRouter;
