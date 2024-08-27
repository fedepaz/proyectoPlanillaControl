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

const Oficial = model("Oficial", oficialSchema);
module.exports = Oficial;

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

const PersonalEmpresa = model("PersonalEmpresa", personalEmpresaSchema);
module.exports = PersonalEmpresa;

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

const PersonalSeguridadEmpresa = model(
  "PersonalSeguridadEmpresa",
  personalSeguridadSchema
);
module.exports = PersonalSeguridadEmpresa;

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

const Empresa = model("Empresa", empresaSchema);
module.exports = Empresa;

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

const MatriculaAeronave = model("MatriculaAeronave", matriculaAeronaveSchema);
module.exports = MatriculaAeronave;

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

const Aeropuerto = model("Aeropuerto", aeropuertoSchema);
module.exports = Aeropuerto;

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

const Vehiculo = model("Vehiculo", vehiculoSchema);
module.exports = Vehiculo;

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

const CodVuelo = model("CodVuelo", codVueloSchema);
module.exports = CodVuelo;
