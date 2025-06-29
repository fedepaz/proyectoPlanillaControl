import { Schema, model } from "mongoose";

const oficialSchema = new Schema({
  dni: {
    type: Number, // Keep as Number
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v.toString()) && v >= 10000000 && v <= 99999999;
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
    max: [999999, "Legajo no corresponde"],
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
    //return the firstname and lastname with the First letter in uppercase and all the other letters in lowercase
    returnedObject.firstname =
      returnedObject.firstname.charAt(0).toUpperCase() +
      returnedObject.firstname.slice(1).toLowerCase();
    returnedObject.lastname =
      returnedObject.lastname.charAt(0).toUpperCase() +
      returnedObject.lastname.slice(1).toLowerCase();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Oficial = model("Oficial", oficialSchema);

const personalEmpresaSchema = new Schema({
  dni: {
    type: Number, // Standardize to Number
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v.toString()) && v >= 10000000 && v <= 99999999;
      },
      message: (props) => `${props.value} is not a valid DNI!`,
    },
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
  legajo: {
    type: Number,
    required: true,
    min: [1, "Legajo debe ser mayor a 0"],
    max: [999999, "Legajo no puede ser mayor a 999999"],
  },
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

personalEmpresaSchema.index({ legajo: 1, empresa: 1 }, { unique: true });

export const PersonalEmpresa = model("PersonalEmpresa", personalEmpresaSchema);

const personalSeguridadSchema = new Schema({
  dni: {
    type: Number, // Standardize to Number (was String)
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v.toString()) && v >= 10000000 && v <= 99999999;
      },
      message: (props) => `${props.value} is not a valid DNI!`,
    },
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true },
  legajo: {
    type: Number,
    required: true,
    min: [1, "Legajo debe ser mayor a 0"],
    max: [999999, "Legajo no puede ser mayor a 999999"],
  },
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

personalSeguridadSchema.index({ legajo: 1, empresa: 1 }, { unique: true });

export const PersonalSeguridadEmpresa = model(
  "PersonalSeguridadEmpresa",
  personalSeguridadSchema
);

const empresaSchema = new Schema({
  empresa: { type: String, required: true },
  tipoEmpresa: {
    type: Schema.Types.ObjectId,
    ref: "TipoEmpresa",
    required: true,
  },
  isUserCreated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  needsValidation: { type: Boolean, default: false }, // Flag for admin review
});

empresaSchema.index({ empresa: 1, tipoEmpresa: 1 }, { unique: true });

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
  tipoVehiculo: {
    type: Schema.Types.ObjectId,
    ref: "TipoVehiculo",
    required: true,
  },
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

vehiculoSchema.index({ empresa: 1, numInterno: 1 }, { unique: true });
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
