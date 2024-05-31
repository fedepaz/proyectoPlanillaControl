import mongoose from "mongoose";

const tipoControlSchema = new mongoose.Schema({
  label: { type: String, required: true },
});

export const TipoControl = mongoose.model("TipoControl", tipoControlSchema);

const mediosTecSchema = new mongoose.Schema({
  label: { type: String, required: true },
});

export const MediosTec = mongoose.model("MediosTec", mediosTecSchema);

const tipoProSchema = new mongoose.Schema({
  label: { type: String, required: true },
});

export const TipoPro = mongoose.model("TipoPro", tipoProSchema);

const demoraSchema = new mongoose.Schema({
  label: { type: String, required: true },
});

export const Demora = mongoose.model("Demora", demoraSchema);

const tipoVueloSchema = new mongoose.Schema({
  label: { type: String, required: true },
});

export const TipoVuelo = mongoose.model("TipoVuelo", tipoVueloSchema);

const funcionSchema = new mongoose.Schema({
  label: { type: String, required: true },
});

export const Funcion = mongoose.model("Funcion", funcionSchema);
