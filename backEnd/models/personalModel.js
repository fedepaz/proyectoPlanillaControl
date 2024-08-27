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
  empresa: [{ type: Schema.Types.ObjectId, ref: "Empresa", required: true }],
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
  empresa: [{ type: Schema.Types.ObjectId, ref: "Empresa", required: true }],
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
  empresa: [{ type: Schema.Types.ObjectId, ref: "Empresa", required: true }],
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

const aeropuertoSchema = new Schema({
  aeropuerto: { type: String, required: true, unique: true },
  codIATA: { type: String, required: true },
  codOACI: { type: String, required: true },
});

aeropuertoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Aeropuerto = model("Aeropuerto", aeropuertoSchema);

const vehiculoSchema = new Schema({
  numInterno: { type: String, required: true, unique: true },
  empresa: [{ type: Schema.Types.ObjectId, ref: "Empresa", required: true }],
  tipoVehiculo: { type: String, required: true },
});

vehiculoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Vehiculo = model("Vehiculo", vehiculoSchema);

const codVueloSchema = new Schema({
  codVuelo: { type: String, required: true, unique: true },
  origen: [{ type: Schema.Types.ObjectId, ref: "Aeropuerto", required: true }],
  destino: [{ type: Schema.Types.ObjectId, ref: "Aeropuerto", required: true }],
  empresa: [{ type: Schema.Types.ObjectId, ref: "Empresa", required: true }],
});

codVueloSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CodVuelo = model("CodVuelo", codVueloSchema);
