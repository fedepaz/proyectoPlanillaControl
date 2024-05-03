import mongoose from "mongoose";

const planillaSchema = mongoose.Schema(
  {
    datosPsa: {
      fecha: { type: String, required: true },
      responsable: { type: String, required: true },
      horaIni: { type: Number, required: true },
      horaFin: { type: Number, required: true },
      cant: { type: Number, required: true },
      tipoControl: { type: Number, required: true },
      medioTec: { type: Number, required: true },
      tipoPro: { type: Number, required: true },
    },
    datosVuelo: {
      aerolinea: { type: String, required: true },
      codVuelo: { type: Number, required: true },
      origen: { type: String, required: true },
      destino: { type: String, required: true },
      horaArribo: { type: Date, required: true },
      horaPartida: { type: Date, required: true },
      demora: { type: Number, required: true },
      tipo: { type: Number, required: true },
      matriculaAeronave: { type: String, required: true },
      posicion: { type: String, required: true },
    },
    datosTerrestre: [
      {
        apellido: { type: String, required: true },
        nombre: { type: String, required: true },
        dni: { type: Number, required: true },
        legajo: { type: Number, required: true },
        funcion: { type: Number, required: true },
        grupo: { type: String, required: true },
      },
    ],
    datosSeguridad: [
      {
        apellido: { type: String, required: true },
        nombre: { type: String, required: true },
        dni: { type: Number, required: true },
        legajo: { type: Number, required: true },
        empresa: { type: String, required: true },
      },
    ],
    datosVehiculos: [
      {
        tipoVehiculo: { type: String, required: true },
        empresa: { type: String, required: true },
        numInterno: { type: Number, required: true },
        operador: { type: String, required: true },
        observaciones: { type: String, required: true },
      },
    ],
    novEquipajes: {
      type: String,
      required: true,
    },
    novInspeccion: {
      type: String,
      required: true,
    },
    novOtras: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Planilla = mongoose.model("Planilla", planillaSchema);
