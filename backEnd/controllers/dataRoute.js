import express from "express";
import {
  TipoControl,
  MediosTec,
  TipoPro,
  Demora,
  TipoVuelo,
  Funcion,
  TipoEmpresa,
  TipoVehiculo,
} from "../models/opcionesModel.js";

const dataRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().select("id label").exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options of ${error.message}`);
    throw error;
  }
};
dataRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Data Connected" });
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

dataRouter.get("/tipoVehiculo", async (req, res) => {
  const tipoVehiculo = await fetchOptions(TipoVehiculo);
  res.json(tipoVehiculo);
});

export default dataRouter;
