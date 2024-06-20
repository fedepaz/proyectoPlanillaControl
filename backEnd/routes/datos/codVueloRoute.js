import express from "express";
import { CodVuelo } from "../../models/personalModel.js";

const router = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().select();
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
    const codVuelo = await fetchOptions(CodVuelo);

    res.status(200).json({
      codVuelo,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const codVuelo = await CodVuelo.findById(id);
    return res.status(200).json(codVuelo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { codVuelo, aeropuerto, tipoVuelo } = req.body;
    if (!codVuelo || !aeropuerto || !tipoVuelo) {
      return res.status(400).json({
        message: "Faltan datos de Vuelo",
      });
    }

    const newCodVuelo = await CodVuelo.create({
      codVuelo,
      aeropuerto,
      tipoVuelo,
    });
    return res.status(201).json(newCodVuelo);
  } catch (error) {
    console.error("Error generando Vuelo:", error);
    return res.status(500).json({ message: "Internal server error " + error });
  }
});

export default router;
