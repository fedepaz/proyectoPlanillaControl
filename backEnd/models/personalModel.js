import mongoose from "mongoose";

const oficialSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  legajo: { type: Number, required: true, unique: true },
});

export const Oficial = mongoose.model("Oficial", oficialSchema);

const personalEmpresaSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  empresa: { type: String, required: true },
  legajo: { type: Number, required: true, unique: true },
});

export const PersonalEmpresa = mongoose.model(
  "PersonalEmpresa",
  personalEmpresaSchema
);

const personalSeguridadSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  empresa: { type: String, required: true },
  legajo: { type: Number, required: true, unique: true },
});

export const PersonalSeguridadEmpresa = mongoose.model(
  "PersonalSeguridadEmpresa",
  personalSeguridadSchema
);
const empresaSchema = new mongoose.Schema({
  empresa: { type: String, required: true, unique: true },
  tipoEmpresa: { type: String, required: true },
});

export const Empresa = mongoose.model("Empresa", empresaSchema);

const matriculaAeronaveSchema = new mongoose.Schema({
  matriculaAeronave: { type: String, required: true, unique: true },
  empresa: { type: String, required: true },
});

export const MatriculaAeronave = mongoose.model(
  "MatriculaAeronave",
  matriculaAeronaveSchema
);

const aeropuertosSchema = new mongoose.Schema({
  aeropuerto: { type: String, required: true, unique: true },
  codIATA: { type: String, required: true },
  codOACI: { type: String, required: true },
});

export const Aeropuertos = mongoose.model("Aeropuertos", aeropuertosSchema);

const vehiculoSchema = new mongoose.Schema({
  numInterno: { type: String, required: true, unique: true },
  empresa: { type: String, required: true },
  tipoVehiculo: { type: String, required: true },
});

export const Vehiculos = mongoose.model("Vehiculos", vehiculoSchema);

const codVueloSchema = new mongoose.Schema({
  codVuelo: { type: String, required: true, unique: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  empresa: { type: String, required: true },
});

export const CodVuelo = mongoose.model("CodVuelo", codVueloSchema);
