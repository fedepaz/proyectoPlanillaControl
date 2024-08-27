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

const TipoControl = model("TipoControl", tipoControlSchema);
module.exports = TipoControl;

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

const MediosTec = model("MediosTec", mediosTecSchema);
module.exports = MediosTec;

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

const TipoPro = model("TipoPro", tipoProSchema);
module.exports = TipoPro;

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

const Demora = model("Demora", demoraSchema);
module.exports = Demora;

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

const TipoVuelo = model("TipoVuelo", tipoVueloSchema);
module.exports = TipoVuelo;

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

const Funcion = model("Funcion", funcionSchema);
module.exports = Funcion;

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

const TipoEmpresa = model("TipoEmpresa", tipoEmpresaSchema);
module.exports = TipoEmpresa;
