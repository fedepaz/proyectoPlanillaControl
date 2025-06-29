import { Schema, model } from "mongoose";

const tipoControlSchema = new Schema({
  label: { type: String, required: true },
});

tipoControlSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TipoControl = model("TipoControl", tipoControlSchema);

const mediosTecSchema = new Schema({
  label: { type: String, required: true },
});

mediosTecSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const MediosTec = model("MediosTec", mediosTecSchema);

const tipoProSchema = new Schema({
  label: { type: String, required: true },
});

tipoProSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TipoPro = model("TipoPro", tipoProSchema);

const demoraSchema = new Schema({
  label: { type: String, required: true },
});

demoraSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Demora = model("Demora", demoraSchema);

const tipoVueloSchema = new Schema({
  label: { type: String, required: true },
});

tipoVueloSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TipoVuelo = model("TipoVuelo", tipoVueloSchema);

const funcionSchema = new Schema({
  label: { type: String, required: true },
});

funcionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Funcion = model("Funcion", funcionSchema);

const tipoEmpresaSchema = new Schema({
  label: { type: String, required: true },
});

tipoEmpresaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TipoEmpresa = model("TipoEmpresa", tipoEmpresaSchema);

const jerarquiaSchema = new Schema({
  label: { type: String, required: true },
});

jerarquiaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Jerarquia = model("Jerarquia", jerarquiaSchema);

const tipoVehiculoSchema = new Schema({
  label: { type: String, required: true },
});

tipoVehiculoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TipoVehiculo = model("TipoVehiculo", tipoVehiculoSchema);
