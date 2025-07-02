import { z } from "zod";

const tipoControlSchema = z
  .array(z.string())
  .min(1, "Al menos un tipo de control es requerido");
const mediosTecSchema = z
  .array(z.string())
  .min(1, "Al menos un medio tecnico es requerido");
const tipoProSchema = z
  .array(z.string())
  .min(1, "Al menos un tipo de procedimiento es requerido");

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

const datosVueloSchema = z
  .object({
    tipoVuelo: z.string().min(1, "Tipo de vuelo es requerido"),
    empresa: z.string().min(1, "Empresa es requerida"),
    codVuelo: z.string().min(1, "Código de vuelo es requerido"),
    horaArribo: z.string().optional(),
    horaPartida: z.string().optional(),
    demora: z.string().min(1, "Tipo de demora es requerido"),
    matriculaAeronave: z.string().min(1, "Matrícula es requerida"),
    posicion: z.string().min(1, "Posición es requerida"),
  })
  .superRefine((data, ctx) => {
    const { horaArribo, horaPartida } = data;
    const hasArribo = !!horaArribo && horaArribo.trim() !== "";
    const hasPartida = !!horaPartida && horaPartida.trim() !== "";

    if (!hasArribo && !hasPartida) {
      ctx.addIssue({
        path: ["horaArribo"],
        code: z.ZodIssueCode.custom,
        message: "Debe ingresarse al menos una hora de arribo o partida",
      });
      ctx.addIssue({
        path: ["horaPartida"],
        code: z.ZodIssueCode.custom,
        message: "Debe ingresarse al menos una hora de arribo o partida",
      });
      return;
    }

    if (hasArribo && !timeFormatValidator(horaArribo!)) {
      ctx.addIssue({
        path: ["horaArribo"],
        code: z.ZodIssueCode.custom,
        message: "Hora de arribo debe estar en formato 24-horas (HHMM)",
      });
    }

    if (hasPartida && !timeFormatValidator(horaPartida!)) {
      ctx.addIssue({
        path: ["horaPartida"],
        code: z.ZodIssueCode.custom,
        message: "Hora de partida debe estar en formato 24-horas (HHMM)",
      });
    }

    if (
      hasArribo &&
      hasPartida &&
      timeFormatValidator(horaArribo!) &&
      timeFormatValidator(horaPartida!) &&
      !isTimeBeforeOrEqual(horaArribo!, horaPartida!)
    ) {
      ctx.addIssue({
        path: ["horaPartida"],
        code: z.ZodIssueCode.custom,
        message: "La hora de partida no puede ser anterior a la hora de arribo",
      });
    }
  });

const planillaSchema = z
  .object({
    id: z.string().optional(),
    datosPsa: z
      .object({
        fecha: z.string().min(1, "Fecha es requerida"),
        responsable: z.string().min(1, "Responsable es requerido"),
        horaIni: z
          .string()
          .min(1, "Hora inicio es requerida")
          .refine(timeFormatValidator, {
            message: "Hora inicio debe estar en formato 24-horas (HHMM)",
          }),
        horaFin: z
          .string()
          .min(1, "Hora fin es requerida")
          .refine(timeFormatValidator, {
            message: "Hora fin debe estar en formato 24-horas (HHMM)",
          }),
        cant: z.string().min(1, "Cantidad es requerida"),
        tipoControl: tipoControlSchema,
        medioTec: mediosTecSchema,
        tipoPro: tipoProSchema,
      })
      .refine((data) => isTimeBeforeOrEqual(data.horaIni, data.horaFin), {
        message: "End time must be after or equal to start time",
        path: ["horaFin"],
      }),

    datosVuelo: datosVueloSchema,
    datosTerrestre: z
      .array(
        z.object({
          personalEmpresa: z
            .string()
            .min(1, "Se requiere al menos una persona"),
          funcion: z.string().min(1, "Se requiere una función"),
          grupo: z.string().min(1, "Se requiere un grupo"),
        })
      )
      .optional()
      .default([]),

    datosSeguridad: z
      .array(
        z.object({
          personalSegEmpresa: z
            .array(z.string())
            .min(1, "Se requiere al menos una persona"),
          empresaSeguridad: z.string().min(1, "Se requiere una empresa"),
        })
      )
      .optional()
      .default([]),

    datosVehiculos: z
      .array(
        z.object({
          vehiculo: z.string().min(1, "Se requiere un vehículo"),
          operadorVehiculo: z.string().min(1, "Se requiere un operador"),
          isObservaciones: z.boolean().default(false),
          observacionesVehiculo: z.string().optional().default(""),
        })
      )
      .optional()
      .default([]),

    novEquipajes: z.object({
      isRequired: z.boolean().default(false),
      observaciones: z.string().default(""),
    }),
    novInspeccion: z.object({
      isRequired: z.boolean().default(false),
      observaciones: z.string().default(""),
    }),
    novOtras: z.object({
      isRequired: z.boolean().default(false),
      observaciones: z.string().default(""),
    }),
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
      message: "La hora de arribo no puede ser anterior a la hora de inicio",
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
      message: "La hora de partida no puede ser posterior a la hora de fin",
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
    tipoVuelo: "",
    empresa: "",
    codVuelo: "",
    horaArribo: "",
    horaPartida: "",
    demora: "",
    matriculaAeronave: "",
    posicion: "",
  },
  datosTerrestre: [],
  datosSeguridad: [],
  datosVehiculos: [],
  novEquipajes: {
    isRequired: false,
    observaciones: "",
  },
  novInspeccion: {
    isRequired: false,
    observaciones: "",
  },
  novOtras: {
    isRequired: false,
    observaciones: "",
  },
};

// Fixed function to avoid type errors
export function formatPlanillaData(data: PlanillaSchema): PlanillaSchema {
  // Currently just returns the data unchanged
  // You can add transformation logic here in the future if needed
  return data;
}
