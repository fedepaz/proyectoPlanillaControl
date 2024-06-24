import express from "express";
import {
  TipoControl,
  MediosTec,
  TipoPro,
  Demora,
  TipoVuelo,
  Funcion,
} from "../models/opcionesModel.js";

const router = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().select("_id label").exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected successfully" });
});

router.get("/tipoControl", async (req, res) => {
  try {
    const tipoControl = await fetchOptions(TipoControl);

    res.status(200).json({
      tipoControl,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
router.get("/mediosTec", async (req, res) => {
  try {
    const mediosTec = await fetchOptions(MediosTec);

    res.status(200).json({
      mediosTec,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/tipoPro", async (req, res) => {
  try {
    const tipoPro = await fetchOptions(TipoPro);

    res.status(200).json({
      tipoPro,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/demora", async (req, res) => {
  try {
    const demora = await fetchOptions(Demora);

    res.status(200).json({
      demora,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/tipoVuelo", async (req, res) => {
  try {
    const tipoVuelo = await fetchOptions(TipoVuelo);

    res.status(200).json({
      tipoVuelo,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/funcion", async (req, res) => {
  try {
    const funcion = await fetchOptions(Funcion);

    res.status(200).json({
      funcion,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
