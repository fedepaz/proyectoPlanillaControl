import express from "express";
import { Oficial } from "../../models/personalModel.js";

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
export default router;
