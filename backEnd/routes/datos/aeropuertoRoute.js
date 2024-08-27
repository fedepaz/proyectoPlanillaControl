import express from "express";
import { Aeropuertos } from "../../schemas/personalModel.js";

const router = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().select().exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

const validateOptions = (field, value, validOptions) => {
  if (!validOptions.includes(value)) {
    throw new Error(`Invalid value for ${field}`);
  }
};

router.get("/", async (req, res) => {
  try {
    const aeropuerto = await fetchOptions(Aeropuertos);

    res.status(200).json({
      aeropuerto,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const aeropuerto = await Aeropuertos.findById(id).exec();
    return res.status(200).json(aeropuerto);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/codIATA/:aero", async (req, res) => {
  try {
    const { aero } = req.params;
    const aeropuerto = await Aeropuertos.findOne({
      codIATA: aero.toUpperCase(),
    }).exec();

    if (!aeropuerto) {
      return res.status(404).json({ message: "No aeropuerto" });
    }
    return res.status(200).json(aeropuerto);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { aeropuerto, codIATA, codOACI } = req.body;
    if (!aeropuerto || !codIATA || !codOACI) {
      return res.status(400).json({
        message: "Faltan datos de Aeropuerto",
      });
    }

    const newAero = await Aeropuertos.create({
      aeropuerto,
      codIATA,
      codOACI,
    }).exec();
    return res.status(201).json(newAero);
  } catch (error) {
    console.error("Error generando Aeropuerto:", error);
    return res.status(500).json({ message: "Internal server error " + error });
  }
});

export default router;
