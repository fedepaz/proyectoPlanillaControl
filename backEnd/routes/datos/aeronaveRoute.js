import express from "express";
import { MatriculaAeronave } from "../../models/personalModel.js";

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
    const matriculaAeronave = await fetchOptions(MatriculaAeronave);

    res.status(200).json({
      matriculaAeronave,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const matriculaAeronave = await MatriculaAeronave.findById(id).exec();
    return res.status(200).json(matriculaAeronave);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/matricula/:matricula", async (req, res) => {
  try {
    const { matricula } = req.params;
    const matriculaAeronaveRE = await MatriculaAeronave.findOne({
      matriculaAeronave: matricula,
    });

    if (!matriculaAeronaveRE) {
      return res.status(404).json({
        message: " No MATRICULA ",
      });
    }
    return res.status(200).json(matriculaAeronaveRE);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { matriculaAeronave, empresa } = req.body;
    if (!matriculaAeronave || !empresa) {
      return res.status(400).json({
        message: "Faltan datos de Aeronave",
      });
    }

    const newMat = await MatriculaAeronave.create({
      matriculaAeronave,
      empresa,
    });
    return res.status(201).json(newMat);
  } catch (error) {
    console.error("Error generando Aeronave:", error);
    return res.status(500).json({ message: "Internal server error " + error });
  }
});

export default router;
