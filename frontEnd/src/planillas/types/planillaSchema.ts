import { z } from "zod";

const planillaSchema = z
  .object({
    datosPsa: z.object({
      fecha: z.string().min(1),
      responsable: z.string().min(1), // Changed to string to represent ObjectId
      horaIni: z.string().time(),
      horaFin: z.string().time(),
      cant: z.string().min(1),
      tipoControl: z.string().min(1), // Changed to array of strings to represent ObjectIds
      medioTec: z.string().min(1), // Changed to array of strings to represent ObjectIds
      tipoPro: z.string().min(1), // Changed to array of strings to represent ObjectIds
    }),
    datosVuelo: z.object({
      codVuelo: z.string().min(1), // Changed to string to represent ObjectId
      horaArribo: z.string().min(1),
      horaPartida: z.string().min(1),
      demora: z.string().min(1), // Changed to string to represent ObjectId
      tipoVuelo: z.string().min(1), // Changed to string to represent ObjectId
      matriculaAeronave: z.string().min(1), // Changed to string to represent ObjectId
      posicion: z.string().min(1),
    }),
    datosTerrestre: z.array(
      z.object({
        personalEmpresa: z.string().min(1), // Changed to array of strings to represent ObjectIds
        funcion: z.string().min(1), // Changed to string to represent ObjectId
        grupo: z.string().min(1),
      })
    ),
    datosSeguridad: z.array(
      z.object({
        personalSegEmpresa: z.string().min(1), // Changed to array of strings to represent ObjectIds
        empresaSeguridad: z.string().min(1), // Changed to string to represent ObjectId
      })
    ),
    datosVehiculos: z.array(
      z.object({
        vehiculo: z.string().min(1), // Changed to string to represent ObjectId
        operadorVehiculo: z.string().min(1), // Changed to string to represent ObjectId
        observacionesVehiculo: z.string().min(1),
      })
    ),
    novEquipajes: z.string().min(1),
    novInspeccion: z.string().min(1),
    novOtras: z.string().min(1),
  })
  .strict();

export { planillaSchema };

export type PlanillaSchema = z.infer<typeof planillaSchema>;
export const defaultValuesPlanilla: Partial<PlanillaSchema> = {
  datosPsa: {
    fecha: "",
    responsable: "",
    horaIni: "",
    horaFin: "",
    cant: "",
    tipoControl: "",
    medioTec: "",
    tipoPro: "",
  },
  datosVuelo: {
    codVuelo: "",
    horaArribo: "",
    horaPartida: "",
    demora: "",
    tipoVuelo: "",
    matriculaAeronave: "",
    posicion: "",
  },
  datosTerrestre: [
    {
      personalEmpresa: "",
      funcion: "",
      grupo: "",
    },
  ],
  datosSeguridad: [
    {
      personalSegEmpresa: "",
      empresaSeguridad: "",
    },
  ],
  datosVehiculos: [
    {
      vehiculo: "",
      operadorVehiculo: "",
      observacionesVehiculo: "",
    },
  ],
  novEquipajes: "",
  novInspeccion: "",
  novOtras: "",
};

function formatPlanillaData(data: PlanillaSchema) {
  return {
    datosPsa: {
      fecha: data.datosPsa.fecha,
      responsable: data.datosPsa.responsable, // Assuming this is already an ObjectId
      horaIni: data.datosPsa.horaIni,
      horaFin: data.datosPsa.horaFin,
      cant: data.datosPsa.cant,
      tipoControl: data.datosPsa.tipoControl, // Assuming this is already an array of ObjectIds
      medioTec: data.datosPsa.medioTec, // Assuming this is already an array of ObjectIds
      tipoPro: data.datosPsa.tipoPro, // Assuming this is already an array of ObjectIds
    },
    datosVuelo: {
      codVuelo: data.datosVuelo.codVuelo, // Assuming this is already an ObjectId
      horaArribo: data.datosVuelo.horaArribo,
      horaPartida: data.datosVuelo.horaPartida,
      demora: data.datosVuelo.demora, // Assuming this is already an ObjectId
      tipoVuelo: data.datosVuelo.tipoVuelo, // Assuming this is already an ObjectId
      matriculaAeronave: data.datosVuelo.matriculaAeronave, // Assuming this is already an ObjectId
      posicion: data.datosVuelo.posicion,
    },
    datosTerrestre: data.datosTerrestre.map((terrestre) => ({
      personalEmpresa: terrestre.personalEmpresa, // Assuming this is already an array of ObjectIds
      funcion: terrestre.funcion, // Assuming this is already an ObjectId
      grupo: terrestre.grupo,
    })),
    datosSeguridad: data.datosSeguridad.map((seguridad) => ({
      personalSegEmpresa: seguridad.personalSegEmpresa, // Assuming this is already an array of ObjectIds
      empresaSeguridad: seguridad.empresaSeguridad, // Assuming this is already an ObjectId
    })),
    datosVehiculos: data.datosVehiculos.map((vehiculo) => ({
      vehiculo: vehiculo.vehiculo, // Assuming this is already an ObjectId
      operadorVehiculo: vehiculo.operadorVehiculo, // Assuming this is already an ObjectId
      observacionesVehiculo: vehiculo.observacionesVehiculo,
    })),
    novEquipajes: data.novEquipajes,
    novInspeccion: data.novInspeccion,
    novOtras: data.novOtras,
  };
}
export { formatPlanillaData };
