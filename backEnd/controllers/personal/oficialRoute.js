import express from "express";
import { Oficial } from "../../models/personalModel.js";

const oficialRouter = express.Router();

const fetchOptions = async (model) => {
  try {
    const options = await model.find().exec();
    return options;
  } catch (error) {
    console.error(`Error fetching options: ${error.message}`);
    throw error;
  }
};

oficialRouter.get("/", async (req, res) => {
  const oficial = await fetchOptions(Oficial);

  res.json(oficial);
});

oficialRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oficial = await Oficial.findById(id);
    if (!oficial) {
      const error = new Error();
      error.status = 404;
      error.name = "OficialNotFound";
      throw error;
    }
    return res.json(oficial);
  } catch (err) {
    next(err);
  }
});

oficialRouter.get("/dni/:dni", async (req, res, next) => {
  const { dni } = req.params;
  try {
    const oficial = await Oficial.findOne({ dni: dni });
    if (!oficial) {
      const error = new Error();
      error.status = 404;
      error.name = "OficialNotFound";
      throw error;
    }
    return res.json(oficial);
  } catch (err) {
    next(err);
  }
});

oficialRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const { dni, firstname, lastname, legajo } = body;
    const requiredFields = ["dni", "firstname", "lastname", "legajo"];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      const error = new Error(
        `Missing required fields: ${missingFields
          .map((field) => field.toUpperCase())
          .join(", ")}`
      );
      error.status = 400;
      error.name = "MissingData";
      throw error;
    }
    const newOficial = new Oficial({
      dni,
      firstname,
      lastname,
      legajo,
    });
    const savedOficial = await newOficial.save();
    return res.status(201).json(savedOficial);
  } catch (err) {
    next(err);
  }
});

export default oficialRouter;
