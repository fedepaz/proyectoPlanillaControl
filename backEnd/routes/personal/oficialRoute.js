import express from "express";
import { Oficial } from "../../models/personalModel.js";

const router = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

router.get("/", async (req, res) => {
  try {
    const oficial = await fetchOptions(Oficial);

    res.status(200).json({
      oficial,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oficial = await Oficial.findById(id).exec();
    return res.status(200).json(oficial);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Oficial not found" });
  }
});

router.get("/dni/:dni", async (req, res) => {
  try {
    const { dni } = req.params;
    const oficial = await Oficial.findOne({ dni: dni });

    if (!oficial) {
      return res.status(404).json({ message: "No DNI" });
    }
    return res.status(200).json(oficial);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Oficial not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { dni, firstname, lastname, legajo } = req.body;
    if (!dni || !firstname || !lastname || !legajo) {
      return res.status(400).json({
        message: "Faltan datos de Oficial",
      });
    }

    const newOficial = await Oficial.create({
      dni,
      firstname,
      lastname,
      legajo,
    });
    return res.status(201).json(newOficial);
  } catch (error) {
    console.error("Error generando Oficial:", error);
    return res.status(500).json({ message: "Internal server error " + error });
  }
});

export default router;
