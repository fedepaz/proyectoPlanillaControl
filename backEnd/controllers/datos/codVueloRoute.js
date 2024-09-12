import express from "express";
import { CodVuelo } from "../../models/personalModel.js";

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

codVueloRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const codVuelo = await CodVuelo.findById(id);
  return res.json(codVuelo);
});

codVueloRouter.get("/codVuelo/:codVuelo", async (req, res) => {
  const { codigo } = req.params;
  const codVuelo = await CodVuelo.findOne({
    codvuelo: codigo,
  });

  if (!codVuelo) {
    return res.status(404).json({ message: "No codVuelo" });
  }
  return res.json(codVuelo);
});

codVueloRouter.post("/", async (req, res) => {
  const { body } = req;
  const { codVuelo, origen, destino, empresa } = body;
  if (!codVuelo || !origen || !destino || !empresa) {
    return res.status(400).json({
      message: "Faltan datos de Vuelo",
    });
  }

  const newCodVuelo = new CodVuelo({
    codVuelo,
    origen,
    destino,
    empresa,
  });

  const savedCodVuelo = await newCodVuelo.save();
  return res.status(201).json(savedCodVuelo);
});

export default codVueloRouter;
