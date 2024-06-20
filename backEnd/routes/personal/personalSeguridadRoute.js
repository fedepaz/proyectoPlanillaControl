import express from "express";
import { PersonalSeguridadEmpresa } from "../../models/personalModel.js";

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
    const personalSeguridadEmpresa = await fetchOptions(
      PersonalSeguridadEmpresa
    );

    res.status(200).json({
      personalSeguridadEmpresa,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const personal = await PersonalSeguridadEmpresa.findById(id);
    return res.status(200).json(personal);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { dni, firstname, lastname, empresa, legajo } = req.body;
    if (!dni || !firstname || !lastname || !empresa || !legajo) {
      return res.status(400).json({
        message: "Faltan datos de Personal",
      });
    }

    const newPersonal = await PersonalSeguridadEmpresa.create({
      dni,
      firstname,
      lastname,
      empresa,
      legajo,
    });
    return res.status(201).json(newPersonal);
  } catch (error) {
    console.error("Error generando Personal:", error);
    return res.status(500).json({ message: "Internal server error " + error });
  }
});

export default router;
