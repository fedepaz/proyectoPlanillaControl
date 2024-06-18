import mongoose from "mongoose";

const planillaSchema = mongoose.Schema(
  {
    datosPsa: {
      fecha: { type: String, required: true },
      responsable: { type: String, required: true },
      horaIni: { type: String, required: true },
      horaFin: { type: String, required: true },
      cant: { type: String, required: true },
      tipoControl: { type: String, required: true },
      medioTec: { type: String, required: true },
      tipoPro: { type: String, required: true },
    },
    datosVuelo: {
      aerolinea: { type: String, required: true },
      codVuelo: { type: String, required: true },
      origen: { type: String, required: true },
      destino: { type: String, required: true },
      horaArribo: { type: String, required: true },
      horaPartida: { type: String, required: true },
      demora: { type: String, required: true },
      tipoVuelo: { type: String, required: true },
      matriculaAeronave: { type: String, required: true },
      posicion: { type: String, required: true },
    },
    datosTerrestre: [
      {
        apellidoTerrestre: { type: String, required: true },
        nombreTerrestre: { type: String, required: true },
        dniTerrestre: { type: String, required: true },
        legajoTerrestre: { type: String, required: true },
        funcion: { type: String, required: true },
        grupo: { type: String, required: true },
      },
    ],
    datosSeguridad: [
      {
        apellidoSeguridad: { type: String, required: true },
        nombreSeguridad: { type: String, required: true },
        dniSeguridad: { type: String, required: true },
        legajoSeguridad: { type: String, required: true },
        empresaSeguridad: { type: String, required: true },
      },
    ],
    datosVehiculos: [
      {
        tipoVehiculo: { type: String, required: true },
        empresaVehiculo: { type: String, required: true },
        numInterno: { type: String, required: true },
        operadorVehiculo: { type: String, required: true },
        observacionesVehiculo: { type: String, required: true },
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
