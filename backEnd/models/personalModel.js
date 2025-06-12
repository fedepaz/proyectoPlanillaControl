import { Schema, model } from "mongoose";

const oficialSchema = new Schema({
  dni: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid DNI!`,
    },
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  legajo: {
    type: Number,
    required: true,
    unique: true,
    min: [500000, "Legajo no corresponde"],
    max: [600000, "Legajo no corresponde"],
  },
  currentAirportId: {
    type: Schema.Types.ObjectId,
    ref: "Aeropuerto",
    required: true,
  },
  jerarquiaId: {
    type: Schema.Types.ObjectId,
    ref: "Jerarquia",
    required: true,
  },
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
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
  legajo: { type: Number, required: true, unique: true },
  isUserCreated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  needsValidation: { type: Boolean, default: false }, // Flag for admin review
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
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
  legajo: { type: Number, required: true, unique: true },
  isUserCreated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  needsValidation: { type: Boolean, default: false }, // Flag for admin review
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
  tipoEmpresa: {
    type: Schema.Types.ObjectId,
    ref: "TipoEmpresa",
    required: true,
  },
  isUserCreated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  needsValidation: { type: Boolean, default: false }, // Flag for admin review
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
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
  isUserCreated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  needsValidation: { type: Boolean, default: false }, // Flag for admin review
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
  codIATA: { type: String, required: true, unique: true },
  codOACI: { type: String, required: false, unique: false },
  // New fields to track user-created airports
  isUserCreated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  needsValidation: { type: Boolean, default: false }, // Flag for admin review
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
  numInterno: { type: String, required: true },
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
  tipoVehiculo: { type: String, required: true },
  isUserCreated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  needsValidation: { type: Boolean, default: false }, // Flag for admin review
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
  origen: { type: Schema.Types.ObjectId, ref: "Aeropuerto", required: true },
  destino: { type: Schema.Types.ObjectId, ref: "Aeropuerto", required: true },
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
  isUserCreated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  needsValidation: { type: Boolean, default: false }, // Flag for admin review
});

codVueloSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CodVuelo = model("CodVuelo", codVueloSchema);
