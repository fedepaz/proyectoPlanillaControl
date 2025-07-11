import { Schema, model } from "mongoose";

const planillaSchema = Schema(
  {
    datosPsa: {
      fecha: { type: String, required: true },
      responsable: {
        type: Schema.Types.ObjectId,
        ref: "Oficial",
        required: true,
      },

      horaIni: { type: String, required: true },
      horaFin: { type: String, required: true },
      cant: { type: String, required: true },
      tipoControl: [
        { type: Schema.Types.ObjectId, ref: "TipoControl", required: true },
      ],
      medioTec: [
        { type: Schema.Types.ObjectId, ref: "MediosTec", required: true },
      ],
      tipoPro: [
        { type: Schema.Types.ObjectId, ref: "TipoPro", required: true },
      ],
    },
    datosVuelo: {
      empresa: {
        type: Schema.Types.ObjectId,
        ref: "Empresa",
        required: true,
      },
      codVuelo: {
        type: Schema.Types.ObjectId,
        ref: "CodVuelo",
        required: true,
      },

      horaArribo: { type: String },
      horaPartida: { type: String },
      demora: { type: Schema.Types.ObjectId, ref: "Demora", required: true },
      tipoVuelo: {
        type: Schema.Types.ObjectId,
        ref: "TipoVuelo",
        required: true,
      },

      matriculaAeronave: {
        type: Schema.Types.ObjectId,
        ref: "MatriculaAeronave",
        required: true,
      },
      posicion: { type: String, required: true },
    },
    datosTerrestre: [
      {
        personalEmpresa: [
          {
            type: Schema.Types.ObjectId,
            ref: "PersonalEmpresa",
            required: true,
          },
        ],
        funcion: {
          type: Schema.Types.ObjectId,
          ref: "Funcion",
          required: true,
        },

        grupo: { type: String, required: true },
      },
    ],
    datosSeguridad: [
      {
        personalSegEmpresa: [
          {
            type: Schema.Types.ObjectId,
            ref: "PersonalSeguridadEmpresa",
            required: true,
          },
        ],
        empresaSeguridad: {
          type: Schema.Types.ObjectId,
          ref: "Empresa",
          required: true,
        },
      },
    ],
    datosVehiculos: [
      {
        vehiculo: {
          type: Schema.Types.ObjectId,
          ref: "Vehiculo",
          required: true,
        },

        operadorVehiculo: {
          type: Schema.Types.ObjectId,
          ref: "PersonalEmpresa",
          required: true,
        },
        isObservaciones: { type: Boolean, default: false },

        observacionesVehiculo: { type: String, default: "" },
      },
    ],

    novEquipajes: {
      isRequired: { type: Boolean, default: false },
      observaciones: { type: String, default: "" },
    },
    novInspeccion: {
      isRequired: { type: Boolean, default: false },
      observaciones: { type: String, default: "" },
    },
    novOtras: {
      isRequired: { type: Boolean, default: false },
      observaciones: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

planillaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Planilla = model("Planilla", planillaSchema);
