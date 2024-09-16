import express from "express";
import { Vehiculo, Empresa } from "../../models/personalModel.js";

const vehiculoRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

vehiculoRouter.get("/", async (req, res) => {
  const vehiculo = await fetchOptions(Vehiculo);
  res.json(vehiculo);
});

vehiculoRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehiculo = await Vehiculo.findById(id);
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

vehiculoRouter.get("/numInterno/:interno", async (req, res, next) => {
  const { interno } = req.params;
  try {
    const numInterno = await Vehiculo.findOne({
      numInterno: interno,
    });
    if (!numInterno) {
      const error = new Error();
      error.status = 404;
      error.name = "VehiculoNotFound";
      throw error;
    }
    return res.json(numInterno);
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
