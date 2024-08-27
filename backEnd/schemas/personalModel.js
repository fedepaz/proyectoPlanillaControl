import { Schema, model } from "mongoose";

const oficialSchema = new Schema({
  dni: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  legajo: { type: Number, required: true, unique: true },
});

oficialSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Oficial = model("Oficial", oficialSchema);

const personalEmpresaSchema = new Schema({
  dni: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  empresa: { type: String, required: true },
  legajo: { type: Number, required: true, unique: true },
});

personalEmpresaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const PersonalEmpresa = model("PersonalEmpresa", personalEmpresaSchema);

const personalSeguridadSchema = new Schema({
  dni: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  empresa: { type: String, required: true },
  legajo: { type: Number, required: true, unique: true },
});

personalSeguridadSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const PersonalSeguridadEmpresa = model(
  "PersonalSeguridadEmpresa",
  personalSeguridadSchema
);
const empresaSchema = new Schema({
  empresa: { type: String, required: true, unique: true },
  tipoEmpresa: { type: String, required: true },
});

empresaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Empresa = model("Empresa", empresaSchema);

const matriculaAeronaveSchema = new Schema({
  matriculaAeronave: { type: String, required: true, unique: true },
  empresa: { type: String, required: true },
});

matriculaAeronaveSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const MatriculaAeronave = model(
  "MatriculaAeronave",
  matriculaAeronaveSchema
);

const aeropuertosSchema = new Schema({
  aeropuerto: { type: String, required: true, unique: true },
  codIATA: { type: String, required: true },
  codOACI: { type: String, required: true },
});

aeropuertosSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Aeropuertos = model("Aeropuertos", aeropuertosSchema);

const vehiculoSchema = new Schema({
  numInterno: { type: String, required: true, unique: true },
  empresa: { type: String, required: true },
  tipoVehiculo: { type: String, required: true },
});

vehiculoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Vehiculos = model("Vehiculos", vehiculoSchema);

const codVueloSchema = new Schema({
  codVuelo: { type: String, required: true, unique: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  empresa: { type: String, required: true },
});

codVueloSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CodVuelo = model("CodVuelo", codVueloSchema);
