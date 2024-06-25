import express from "express";
import { Vehiculos } from "../../models/personalModel.js";

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
    const vehiculo = await fetchOptions(Vehiculos);

    res.status(200).json({
      vehiculo,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculos.findById(id).exec();
    return res.status(200).json(vehiculo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/numInterno/:interno", async (req, res) => {
  try {
    const { interno } = req.params;
    const numInterno = await Vehiculos.findOne({
      numInterno: interno,
    }).exec();

    if (!numInterno) {
      return res.status(404).json({ message: "No numInterno" });
    }
    return res.status(200).json(numInterno);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { numInterno, empresa, tipoVehiculo } = req.body;
    if (!numInterno || !empresa || !tipoVehiculo) {
      return res.status(400).json({
        message: "Faltan datos de Vehiculo",
      });
    }

    const newVehiculo = await Vehiculos.create({
      numInterno,
      empresa,
      tipoVehiculo,
    }).exec();
    return res.status(201).json(newVehiculo);
  } catch (error) {
    console.error("Error generando Vehiculo:", error);
    return res.status(500).json({ message: "Internal server error " + error });
  }
});

export default router;
