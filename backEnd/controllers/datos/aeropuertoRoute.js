import express from "express";
import { Aeropuerto } from "../../models/personalModel.js";
import { generateUserOACICode } from "../../utils/oaciCodeGenerator.utils.js";

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
    const { aeropuerto, codIATA } = body;
    const requiredFields = ["aeropuerto", "codIATA"];
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
    const existingAero = await Aeropuerto.findOne({
      $or: [
        { aeropuerto: { $regex: new RegExp(`^${aeropuerto}$`, "i") } },
        { codIATA: codIATAUpper },
      ],
    });

    if (existingAero) {
      const field =
        existingAero.aeropuerto.toLowerCase() === aeropuerto.toLowerCase()
          ? "aeropuerto"
          : "codIATA";
      const error = new Error(
        `Duplicate value. ${field.toUpperCase()} already exists`
      );
      error.status = 409;
      error.name = "AeropuertoDuplicate";
      throw error;
    }

    // Generate OACI code for the new airport
    const generatedOACI = await generateUserOACICode();

    const newAero = new Aeropuerto({
      aeropuerto: aeropuerto.toUpperCase(),
      codIATA: codIATAUpper,
      codOACI: generatedOACI,
      isUserCreated: true,
      needsValidation: true,
    });

    const savedAero = await newAero.save();

    return res.status(201).json(savedAero);
  } catch (error) {
    next(error);
  }
});

aeropuertoRouter.get("/userCreatedAeropuertos", async (req, res, next) => {
  try {
    const userCreatedAeropuertos = await Aeropuerto.find({
      isUserCreated: true,
      needsValidation: false,
    }).sort({ createdAt: -1 });

    return res.json(userCreatedAeropuertos);
  } catch (error) {
    next(error);
  }
});

aeropuertoRouter.patch("/:id/needsValidation", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isValid, realOACI } = req.body;

    const aeropuerto = await Aeropuerto.findById(id);
    if (!aeropuerto) {
      const error = new Error();
      error.status = 404;
      error.name = "AeropuertoNotFound";
      throw error;
    }

    if (!aeropuerto.isUserCreated) {
      const error = new Error("This airport is not a system-generated airport");
      error.status = 400;
      error.name = "InvalidOperation";
      throw error;
    }

    if (isValid && realOACI) {
      aeropuerto.codOACI = realOACI.toUpperCase();
      aeropuerto.isUserCreated = false;
      aeropuerto.needsValidation = false;
      const updatedAeropuerto = await aeropuerto.save();
      return res.json(updatedAeropuerto);
    } else {
      await Aeropuerto.findByIdAndDelete(id);
      return res.json({
        message: "Aeropuerto Eliminado: inválido o rechazado",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default aeropuertoRouter;
