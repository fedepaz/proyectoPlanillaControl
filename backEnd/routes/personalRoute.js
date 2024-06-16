import express from "express";
import {
  Oficial,
  PersonalEmpresa,
  PersonalSeguridadEmpresa,
  Empresa,
} from "../models/personalModel.js";

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

router.get("/oficial", async (req, res) => {
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

router.get("/oficial/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oficial = await Oficial.findById(id);
    return res.status(200).json(oficial);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/personalEmpresa", async (req, res) => {
  try {
    const personalEmpresa = await fetchOptions(PersonalEmpresa);

    res.status(200).json({
      personalEmpresa,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/personalSeguridadEmpresa", async (req, res) => {
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

router.get("/empresa", async (req, res) => {
  try {
    const empresa = await fetchOptions(Empresa);

    res.status(200).json({
      empresa,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
