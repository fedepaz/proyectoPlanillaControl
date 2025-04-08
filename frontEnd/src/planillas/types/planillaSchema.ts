import { isBefore } from "date-fns";
import { z } from "zod";

const planillaSchema = z
  .object({
    id: z.string(),
    datosPsa: z
      .object({
        fecha: z.string().min(1),
        responsable: z.string().min(1),
        horaIni: z.string().datetime(),
        horaFin: z.string().datetime(),
        cant: z.string().min(1),
        tipoControl: z.string().min(1),
        medioTec: z.string().min(1),
        tipoPro: z.string().min(1),
      })
      .refine(
        (data) => {
          const start = new Date(data.horaIni);
          const end = new Date(data.horaFin);
          return isBefore(end, start);
        },
        {
          message: "End time must be after start time",
          path: ["horaFin"],
        }
      )
      .refine(
        (data) => {
          const start = new Date(data.horaIni);
          const now = new Date();
          return !isBefore(start, now);
        },
        {
          message: "Start time cannot be in the past",
          path: ["horaIni"],
        }
      ),
    datosVuelo: z.object({
      aerolinea: z.string().min(1),
      codVuelo: z.string().min(1),
      origen: z.string().min(1),
      destino: z.string().min(1),
      horaArribo: z.string().min(1),
      horaPartida: z.string().min(1),
      demora: z.string().min(1),
      tipoVuelo: z.string().min(1),
      matriculaAeronave: z.string().min(1),
      posicion: z.string().min(1),
    }),
    datosTerrestre: z.array(
      z.object({
        dniTerrestre: z.number(),
        apellidoTerrestre: z.string().min(1),
        nombreTerrestre: z.string().min(1),
        legajoTerrestre: z.number(),
        funcion: z.string().min(1), // Changed to string to represent ObjectId
        grupo: z.number(),
      })
    ),
    datosSeguridad: z.array(
      z.object({
        apellidoSeguridad: z.string().min(1),
        nombreSeguridad: z.string().min(1),
        dniSeguridad: z.string().min(1),
        legajoSeguridad: z.string().min(1),
        empresaSeguridad: z.string().min(1), // Changed to string to represent ObjectId
      })
    ),
    datosVehiculos: z.array(
      z.object({
        tipoVehiculo: z.string().min(1),
        empresaVehiculo: z.string().min(1),
        numInterno: z.string().min(1),
        operadorVehiculo: z.string().min(1),
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
    empresa: "",
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

function formatPlanillaData(data: PlanillaSchema): PlanillaSchema {
  return data;
}
export { formatPlanillaData };
