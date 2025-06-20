import { z } from "zod";

const isValidObjectId = (id: string) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const objectIdSchema = z.string().refine(isValidObjectId, {
  message: "Invalid ID format",
});

const dniSchema = z
  .string()
  .regex(/^\d{8}$/, "El DNI debe tener 8 números")
  .transform((val) => parseInt(val, 10))
  .refine((val) => val >= 10000000 && val <= 99999999, {
    message: "El DNI debe estar entre 10.000.000 y 99.999.999",
  });
const legajoOficialSchema = z
  .string()
  .regex(/^\d{1,6}$/, "El legajo debe contener solo números (máximo 6 dígitos)")
  .transform((val) => parseInt(val, 10))
  .refine((val) => val >= 500000 && val <= 999999, {
    message: "El legajo debe estar entre 500000 y 999999",
  });

const oficialSchema = z.object({
  dni: dniSchema,
  firstname: z
    .string()
    .min(1, "El Nombre es requerido")
    .max(20, "El Nombre es muy largo")
    .transform((val) => val.trim().toUpperCase()),

  lastname: z
    .string()
    .min(1, "El Apellido es requerido")
    .max(20, "El Apellido es muy largo")
    .transform((val) => val.trim().toUpperCase()),

  legajo: legajoOficialSchema,
  id: z.string().optional(),
});

export { oficialSchema };

export type OficialSchema = z.infer<typeof oficialSchema>;

export const defaultValuesOficial: Partial<OficialSchema> = {
  firstname: "",
  lastname: "",
};
const legajoPersonalSchema = z
  .string()
  .regex(
    /^\d{1,10}$/,
    "El legajo debe contener solo números (máximo 6 dígitos)"
  )
  .transform((val) => parseInt(val, 10))
  .refine((val) => val >= 1 && val <= 999999, {
    message: "El legajo debe estar entre 1 y 999999",
  });

const personalEmpresaSchema = z.object({
  dni: dniSchema,
  firstname: z
    .string()
    .min(1, "El Nombre es requerido")
    .max(20, "El Nombre es muy largo"),
  lastname: z
    .string()
    .min(1, "El Apellido es requerido")
    .max(20, "El Apellido es muy largo"),
  empresa: objectIdSchema.describe("Empresa ID"),
  legajo: legajoPersonalSchema,
});

export { personalEmpresaSchema };

export type PersonalEmpresaSchema = z.infer<typeof personalEmpresaSchema>;
export type PersonalEmpresaSchemaInput = z.input<typeof personalEmpresaSchema>;

export const defaultValuesPersonalEmpresa: Partial<PersonalEmpresaSchemaInput> =
  {
    firstname: "",
    lastname: "",
  };

const personalSeguridadSchema = z.object({
  dni: dniSchema,
  firstname: z
    .string()
    .min(1, "El Nombre es requerido")
    .max(20, "El Nombre es muy largo"),
  lastname: z
    .string()
    .min(1, "El Apellido es requerido")
    .max(20, "El Apellido es muy largo"),
  empresa: objectIdSchema.describe("Empresa ID"),
  legajo: legajoPersonalSchema,
});

export { personalSeguridadSchema };

export type PersonalSeguridadSchema = z.infer<typeof personalSeguridadSchema>;

export const defaultValuesPersonalSeguridad: Partial<PersonalSeguridadSchema> =
  {
    firstname: "",
    lastname: "",
  };

const empresaSchema = z.object({
  empresa: z
    .string()
    .min(1, "La Empresa es requerida")
    .max(50, "El Nombre es muy largo"),
  tipoEmpresa: objectIdSchema.describe("Tipo Empresa ID"),
});

export { empresaSchema };

export type EmpresaSchema = z.infer<typeof empresaSchema>;

export const defaultValuesEmpresa: Partial<EmpresaSchema> = {
  empresa: "",
};

const regex = /[A-Za-z][A-Za-z]-[A-Za-z][A-Za-z][A-Za-z]/i;

const matriculaAeronaveSchema = z.object({
  matriculaAeronave: z
    .string()
    .max(
      6,
      "Debe colocar la matricula con dos letras guion tres letras: ej LV-ZFO "
    )
    .toUpperCase()
    .regex(
      regex,
      "Debe colocar la matricula con dos letras guion tres letras: ej LV-ZFO "
    ),
  empresa: objectIdSchema.describe("Empresa ID"),
});

export { matriculaAeronaveSchema };

export type MatriculaAeronaveSchema = z.infer<typeof matriculaAeronaveSchema>;

export const defaultValuesMatricula: MatriculaAeronaveSchema = {
  matriculaAeronave: "",
  empresa: "",
};

const aeropuertosSchema = z.object({
  aeropuerto: z
    .string()
    .min(1, "El aeropuerto es requerido")
    .max(50, "El Nombre es muy largo"),
  codIATA: z
    .string()
    .toUpperCase()
    .length(3, "Consiste en 3 letras del alfabeto latino"),
});

export { aeropuertosSchema };

export type AeropuertosSchema = z.infer<typeof aeropuertosSchema>;

export const defaultValuesAeropuertos: AeropuertosSchema = {
  aeropuerto: "",
  codIATA: "",
};

const vehiculoSchema = z.object({
  tipoVehiculo: z
    .string()
    .max(50, "El tipo de vehículo es muy largo")
    .optional(),
  empresa: objectIdSchema.describe("Empresa ID"),
  numInterno: z.string().min(1, "Número interno requerido"),
});

export { vehiculoSchema };

export type VehiculosSchema = z.infer<typeof vehiculoSchema>;

export const defaultValuesVehiculos: Partial<VehiculosSchema> = {
  tipoVehiculo: "",
  numInterno: "",
};

const codVueloSchema = z.object({
  codVuelo: z
    .string()
    .regex(/^\d+$/, "El código de vuelo debe contener solo números")
    .min(1, "El código de vuelo es requerido"),
  origen: objectIdSchema.describe("Aeropuerto ID"),
  destino: objectIdSchema.describe("Aeropuerto ID"),
  empresa: objectIdSchema.describe("Empresa ID"),
});

export { codVueloSchema };

export type CodVueloSchema = z.infer<typeof codVueloSchema>;

export const defaultValuesCodVuelos: Partial<CodVueloSchema> = {
  empresa: "",
};
