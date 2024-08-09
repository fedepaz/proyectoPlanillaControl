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

const router = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().select("_id label").exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options of ${error.message}`);
    throw error;
  }
};

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.status(200).send("dataOptions connected");
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

router.get("/tipoEmpresa", async (req, res) => {
  try {
    const tipoEmpresa = await fetchOptions(TipoEmpresa);

    res.status(200).json({
      tipoEmpresa,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
router.post("/tipoEmpresa", async (req, res) => {
  try {
    const { label } = req.body;
    if (!label)
      res.status(400).json({
        message: "Falta tipo empresa",
      });
    const newTipo = await TipoEmpresa.create({
      label,
    });
    return res.status(201).json(newTipo);
  } catch (error) {
    console.error("Error generando tipo Empresa:", error);
    return res.status(500).json({ message: "Internal server error " + error });
  }
});

export default router;
