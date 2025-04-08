import { z } from "zod";

const tipoControlSchema = z
  .array(z.string())
  .min(1, "At least one control type is required");
const mediosTecSchema = z
  .array(z.string())
  .min(1, "At least one technical method is required");
const tipoProSchema = z
  .array(z.string())
  .min(1, "At least one procedure type is required");

// Custom validator for 24-hour time format (HHMM)
const timeFormatValidator = (value: string) => {
  // Check if it's a 4-digit string
  if (!/^\d{4}$/.test(value)) {
    return false;
  }

  // Extract hours and minutes
  const hours = parseInt(value.substring(0, 2), 10);
  const minutes = parseInt(value.substring(2, 4), 10);

  // Validate hours and minutes are within valid ranges
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

// Function to compare times in HHMM format
const isTimeBeforeOrEqual = (time1: string, time2: string): boolean => {
  if (!timeFormatValidator(time1) || !timeFormatValidator(time2)) {
    return false;
  }

  return parseInt(time1, 10) <= parseInt(time2, 10);
};

const planillaSchema = z
  .object({
    datosPsa: z
      .object({
        fecha: z.string().min(1, "Date is required"),
        responsable: z.string().min(1, "Responsible officer is required"),
        horaIni: z
          .string()
          .min(1, "Start time is required")
          .refine(timeFormatValidator, {
            message: "Start time must be in 24-hour format (HHMM)",
          }),
        horaFin: z
          .string()
          .min(1, "End time is required")
          .refine(timeFormatValidator, {
            message: "End time must be in 24-hour format (HHMM)",
          }),
        cant: z.string().min(1, "Count is required"),
        tipoControl: tipoControlSchema,
        medioTec: mediosTecSchema,
        tipoPro: tipoProSchema,
      })
      .refine((data) => isTimeBeforeOrEqual(data.horaIni, data.horaFin), {
        message: "End time must be after or equal to start time",
        path: ["horaFin"],
      }),

    datosVuelo: z
      .object({
        empresa: z.string().min(1, "Company is required"),
        codVuelo: z.string().min(1, "Flight code is required"),
        horaArribo: z
          .string()
          .min(1, "Arrival time is required")
          .refine(timeFormatValidator, {
            message: "Arrival time must be in 24-hour format (HHMM)",
          }),
        horaPartida: z
          .string()
          .min(1, "Departure time is required")
          .refine(timeFormatValidator, {
            message: "Departure time must be in 24-hour format (HHMM)",
          }),
        demora: z.string().min(1, "Delay type is required"),
        tipoVuelo: z.string().min(1, "Flight type is required"),
        matriculaAeronave: z
          .string()
          .min(1, "Aircraft registration is required"),
        posicion: z.string().min(1, "Position is required"),
      })
      .refine(
        (data) => isTimeBeforeOrEqual(data.horaArribo, data.horaPartida),
        {
          message: "Departure time must be after or equal to arrival time",
          path: ["horaPartida"],
        }
      ),

    datosTerrestre: z
      .array(
        z.object({
          personalEmpresa: z
            .array(z.string())
            .min(1, "At least one company personnel is required"),
          funcion: z.string().min(1, "Function is required"),
          grupo: z.string().min(1, "Group is required"),
        })
      )
      .optional()
      .default([]),

    datosSeguridad: z
      .array(
        z.object({
          personalSegEmpresa: z
            .array(z.string())
            .min(1, "At least one security personnel is required"),
          empresaSeguridad: z.string().min(1, "Security company is required"),
        })
      )
      .optional()
      .default([]),

    datosVehiculos: z
      .array(
        z.object({
          vehiculo: z.string().min(1, "Vehicle is required"),
          operadorVehiculo: z.string().min(1, "Vehicle operator is required"),
          observacionesVehiculo: z
            .string()
            .min(1, "Vehicle observations are required"),
        })
      )
      .optional()
      .default([]),

    novEquipajes: z.string().default(""),
    novInspeccion: z.string().default(""),
    novOtras: z.string().default(""),
  })
  // Add validation to ensure arrival time isn't before PSA start time
  .refine(
    (data) => {
      // Only validate if both fields have values
      if (!data.datosPsa.horaIni || !data.datosVuelo.horaArribo) {
        return true;
      }
      return isTimeBeforeOrEqual(
        data.datosPsa.horaIni,
        data.datosVuelo.horaArribo
      );
    },
    {
      message: "Arrival time cannot be before PSA start time",
      path: ["datosVuelo", "horaArribo"],
    }
  )
  // Add validation to ensure departure time isn't after PSA end time
  .refine(
    (data) => {
      // Only validate if both fields have values
      if (!data.datosPsa.horaFin || !data.datosVuelo.horaPartida) {
        return true;
      }
      return isTimeBeforeOrEqual(
        data.datosVuelo.horaPartida,
        data.datosPsa.horaFin
      );
    },
    {
      message: "Departure time cannot be after PSA end time",
      path: ["datosVuelo", "horaPartida"],
    }
  );

export { planillaSchema };

export type PlanillaSchema = z.infer<typeof planillaSchema>;

export const defaultValuesPlanilla: PlanillaSchema = {
  datosPsa: {
    fecha: new Date().toISOString().split("T")[0],
    responsable: "",
    horaIni: "",
    horaFin: "",
    cant: "",
    tipoControl: [],
    medioTec: [],
    tipoPro: [],
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
  datosTerrestre: [],
  datosSeguridad: [],
  datosVehiculos: [],
  novEquipajes: "",
  novInspeccion: "",
  novOtras: "",
};

// Fixed function to avoid type errors
export function formatPlanillaData(data: PlanillaSchema): PlanillaSchema {
  // Currently just returns the data unchanged
  // You can add transformation logic here in the future if needed
  return data;
}
