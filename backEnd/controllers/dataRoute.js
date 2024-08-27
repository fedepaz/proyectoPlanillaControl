import express from "express";
import {
  TipoControl,
  MediosTec,
  TipoPro,
  Demora,
  TipoVuelo,
  Funcion,
  TipoEmpresa,
} from "../models/opcionesModel.js";

const dataRouter = express.Router();

dataRouter.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.send("dataOptions connected");
});

dataRouter.get("/tipoControl", async (req, res) => {
  const tipoControl = await TipoControl.find();

  res.json(tipoControl);
});

dataRouter.get("/mediosTec", async (req, res) => {
  const mediosTec = await MediosTec.find();

  res.json(mediosTec);
});

dataRouter.get("/tipoPro", async (req, res) => {
  const tipoPro = await TipoPro.find();

  res.json(tipoPro);
});

dataRouter.get("/demora", async (req, res) => {
  const demora = await Demora.find();

  res.json(demora);
});

dataRouter.get("/tipoVuelo", async (req, res) => {
  const tipoVuelo = await TipoVuelo.find();

  res.json(tipoVuelo);
});

dataRouter.get("/funcion", async (req, res) => {
  const funcion = await Funcion.find();

  res.json(funcion);
});

dataRouter.get("/tipoEmpresa", async (req, res) => {
  const tipoEmpresa = await TipoEmpresa.find();

  res.json(tipoEmpresa);
});

dataRouter.post("/tipoEmpresa", async (req, res) => {
  const { body } = req;
  const { label } = body;
  if (!label)
    res.status(400).json({
      message: "Falta tipo empresa",
    });

  const newTipo = new TipoEmpresa({
    label,
  });

  const savedTipo = newTipo.save();
  return res.status(201).json(savedTipo);
});

export default dataRouter;
