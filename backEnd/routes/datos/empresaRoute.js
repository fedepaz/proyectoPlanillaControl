import express from "express";
import { Empresa } from "../../models/personalModel.js";

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
    const empresa = await fetchOptions(Empresa);

    res.status(200).json({
      empresa,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);
    return res.status(200).json(empresa);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { empresa } = req.body;
    if (!empresa) {
      return res.status(400).json({
        message: "Faltan datos de Empresa",
      });
    }

    const newEmpresa = await Empresa.create({
      empresa,
    });
    return res.status(201).json(newEmpresa);
  } catch (error) {
    console.error("Error generando Empresa:", error);
    return res.status(500).json({ message: "Internal server error " + error });
  }
});

export default router;
