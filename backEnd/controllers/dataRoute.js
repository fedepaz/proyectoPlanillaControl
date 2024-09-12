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

const fetchOptions = async (model) => {
  try {
    const options = await model.find().select("_id label");
    return options;
  } catch (error) {
    console.error(`Error fetching options of ${error.message}`);
    throw error;
  }
};

dataRouter.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.send("dataOptions connected");
});

dataRouter.get("/tipoControl", async (req, res) => {
  const tipoControl = await fetchOptions(TipoControl);

  res.status(200).json(tipoControl);
});

dataRouter.get("/mediosTec", async (req, res) => {
  const mediosTec = await fetchOptions(MediosTec);
  res.json(mediosTec);
});

dataRouter.get("/tipoPro", async (req, res) => {
  const tipoPro = await fetchOptions(TipoPro);
  res.json(tipoPro);
});

dataRouter.get("/demora", async (req, res) => {
  const demora = await fetchOptions(Demora);
  res.json(demora);
});

dataRouter.get("/tipoVuelo", async (req, res) => {
  const tipoVuelo = await fetchOptions(TipoVuelo);
  res.json(tipoVuelo);
});

dataRouter.get("/funcion", async (req, res) => {
  const funcion = await fetchOptions(Funcion);
  res.json(funcion);
});

dataRouter.get("/tipoEmpresa", async (req, res) => {
  const tipoEmpresa = await fetchOptions(TipoEmpresa);
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
