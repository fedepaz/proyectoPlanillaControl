import express from "express";
import { Empresa } from "../../models/personalModel.js";

const empresaRouter = express.Router();

empresaRouter.get("/", async (req, res) => {
  const empresa = await Empresa.find();

  res.json(empresa);
});

empresaRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const empresa = await Empresa.findById(id);
  return res.json(empresa);
});

empresaRouter.post("/", async (req, res) => {
  const { body } = req;
  const { empresa, tipoEmpresa } = body;
  if (!empresa | !tipoEmpresa) {
    return res.status(400).json({
      message: "Faltan datos de Empresa",
    });
  }

  const newEmpresa = new Empresa({
    empresa,
    tipoEmpresa,
  });

  const savedEmpresa = await newEmpresa.save();
  return res.status(201).json(savedEmpresa);
});

export default empresaRouter;
