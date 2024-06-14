import mongoose from "mongoose";

const oficialSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  firstName: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  legajo: { type: Number, required: true, unique: true },
});

export const Oficial = mongoose.model("Oficial", oficialSchema);

const personalEmpresaSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  firstName: { type: String, required: true },
  empresa: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  legajo: { type: String, required: true, unique: true },
});

export const PersonalEmpresa = mongoose.model(
  "PersonalEmpresa",
  personalEmpresaSchema
);

const personalSeguridadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  firstName: { type: String, required: true },
  empresa: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  legajo: { type: String, required: true, unique: true },
});

export const PersonalSeguridadEmpresa = mongoose.model(
  "PersonalSeguridadEmpresa",
  personalSeguridadSchema
);
const empresaSchema = new mongoose.Schema({
  empresa: { type: String, required: true, unique: true },
});

export const Empresa = mongoose.model("Empresa", empresaSchema);
