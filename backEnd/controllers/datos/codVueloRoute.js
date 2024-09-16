import express from "express";
import { CodVuelo, Aeropuerto, Empresa } from "../../models/personalModel.js";

const codVueloRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().select();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

codVueloRouter.get("/", async (req, res) => {
  const codVuelo = await fetchOptions(CodVuelo);
  res.json(codVuelo);
});

codVueloRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const codVuelo = await CodVuelo.findById(id);
    if (!codVuelo) {
      const error = new Error();
      error.status = 404;
      error.name = "CodVueloNotFound";
      throw error;
    }
    return res.json(codVuelo);
  } catch (error) {
    next(error);
  }
});

codVueloRouter.get("/codVuelo/:codVuelo", async (req, res, next) => {
  const { codVuelo } = req.params;
  try {
    const codVueloRes = await CodVuelo.findOne({
      codVuelo: codVuelo,
    });

    if (!codVueloRes) {
      const error = new Error();
      error.status = 404;
      error.name = "CodVueloNotFound";
      throw error;
    }
    return res.json(codVueloRes);
  } catch (error) {
    next(error);
  }
});

codVueloRouter.post("/", async (req, res, next) => {
  const { body } = req;

  try {
    const { codVuelo, origen, destino, empresa } = body;

    const requiredFields = ["codVuelo", "origen", "destino", "empresa"];
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
    const aeropuertoOrigenExist = await Aeropuerto.findById(origen);
    const aeropuertoDestinoExist = await Aeropuerto.findById(destino);
    const empresaExist = await Empresa.findById(empresa);
    if (!aeropuertoOrigenExist || !aeropuertoDestinoExist) {
      const error = new Error();
      error.status = 404;
      error.name = "AeropuertoNotFound";
      throw error;
    }
    if (!empresaExist) {
      const error = new Error();
      error.status = 404;
      error.name = "EmpresaNotFound";
      throw error;
    }

    const newCodVuelo = new CodVuelo({
      codVuelo,
      origen,
      destino,
      empresa,
    });

    const savedCodVuelo = await newCodVuelo.save();
    return res.status(201).json(savedCodVuelo);
  } catch (error) {
    next(error);
  }
});

export default codVueloRouter;
