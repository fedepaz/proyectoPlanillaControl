import express from "express";
import { MatriculaAeronave } from "../../models/personalModel.js";

const aeronaveRouter = express.Router();

aeronaveRouter.get("/", async (req, res) => {
  const matriculaAeronave = await MatriculaAeronave.find();

  res.json(matriculaAeronave);
});

aeronaveRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const matriculaAeronave = await MatriculaAeronave.findById(id);
  return res.json(matriculaAeronave);
});

aeronaveRouter.get("/matricula/:matricula", async (req, res) => {
  const { matricula } = req.params;
  const matriculaAeronaveRE = await MatriculaAeronave.findOne({
    matriculaAeronave: matricula,
  });

  if (!matriculaAeronaveRE) {
    return res.status(404).json({
      message: " No MATRICULA ",
    });
  }
  return res.json(matriculaAeronaveRE);
});

aeronaveRouter.post("/", async (req, res) => {
  const { body } = req;
  const { matriculaAeronave, empresa } = body;
  if (!matriculaAeronave || !empresa) {
    return res.status(400).json({
      message: "Faltan datos de Aeronave",
    });
  }

  const newMat = new MatriculaAeronave({
    matriculaAeronave,
    empresa,
  });

  const savedMat = await newMat.save();
  return res.status(201).json(savedMat);
});

export default aeronaveRouter;
