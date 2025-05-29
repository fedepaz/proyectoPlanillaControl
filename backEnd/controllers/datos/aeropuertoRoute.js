import express from "express";
import { Aeropuerto } from "../../models/personalModel.js";

const aeropuertoRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

aeropuertoRouter.get("/", async (req, res) => {
  const aeropuerto = await fetchOptions(Aeropuerto);
  res.json(aeropuerto);
});

aeropuertoRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const aeropuerto = await Aeropuerto.findById(id);
    if (!aeropuerto) {
      const error = new Error();
      error.status = 404;
      error.name = "AeropuertoNotFound";
      throw error;
    }
    return res.json(aeropuerto);
  } catch (error) {
    next(error);
  }
});

aeropuertoRouter.get("/codIATA/:aero", async (req, res, next) => {
  const { aero } = req.params;
  try {
    const aeropuerto = await Aeropuerto.findOne({
      codIATA: aero.toUpperCase(),
    });

    if (!aeropuerto) {
      const error = new Error();
      error.status = 404;
      error.name = "AeropuertoNotFound";
      throw error;
    }
    return res.json(aeropuerto);
  } catch (error) {
    next(error);
  }
});

aeropuertoRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const { aeropuerto, codIATA, codOACI } = body;
    const requiredFields = ["aeropuerto", "codIATA", "codOACI"];
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

    const codIATAUpper = codIATA.toUpperCase();
    const codOACIUpper = codOACI.toUpperCase();
    const existingAero = await Aeropuerto.findOne({
      $or: [
        { aeropuerto: aeropuerto },
        { codIATA: codIATAUpper },
        { codOACI: codOACIUpper },
      ],
    });

    if (existingAero) {
      const field =
        existingAero.aeropuerto === aeropuerto
          ? "aeropuerto"
          : existingAero.codIATA === codIATAUpper
          ? "codIATA"
          : "codOACI";
      const error = new Error(
        `Duplicate value. ${field.toUpperCase()} already exists`
      );
      error.status = 409;
      error.name = "AeropuertoDuplicate";
      throw error;
    }

    const newAero = new Aeropuerto({
      aeropuerto,
      codIATA: codIATAUpper,
      codOACI: codOACIUpper,
    });

    const savedAero = await newAero.save();
    return res.status(201).json(savedAero);
  } catch (error) {
    next(error);
  }
});

export default aeropuertoRouter;
