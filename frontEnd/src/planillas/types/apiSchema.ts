import { z } from "zod";

const isValidObjectId = (id: string) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const objectIdSchema = z.string().refine(isValidObjectId, {
  message: "Invalid ID format",
});

const dniSchema = z.string().regex(/^\d{8}$/, "El DNI debe tener 8 números");

const oficialSchema = z.object({
  dni: dniSchema,
  firstname: z
    .string()
    .min(1, "El Nombre es requerido")
    .max(20, "El Nombre es muy largo"),
  lastname: z
    .string()
    .min(1, "El Apellido es requerido")
    .max(20, "El Apellido es muy largo"),
  legajo: z
    .number()
    .int()
    .min(500000, "Legajo no corresponde")
    .max(600000, "Legajo no corresponde"),
  id: z.string().optional(),
});

export { oficialSchema };

export type OficialSchema = z.infer<typeof oficialSchema>;

export const defaultValuesOficial: Partial<OficialSchema> = {
  firstname: "",
  lastname: "",
};

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
  legajo: z
    .number({ message: "Solo número se pueden ingresar" })
    .int()
    .min(1, "Legajo insuficiente")
    .max(999999, "El Legajo no existe"),
});

export { personalEmpresaSchema };

export type PersonalEmpresaSchema = z.infer<typeof personalEmpresaSchema>;

export const defaultValuesPersonalEmpresa: Partial<PersonalEmpresaSchema> = {
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
  legajo: z
    .number({ message: "Solo número se pueden ingresar" })
    .int()
    .min(1, "Legajo insuficiente")
    .max(999999, "El Legajo no existe"),
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
  codOACI: z.string().toUpperCase().length(4, "Consiste en 4 letras Ej:SAME"),
});

export { aeropuertosSchema };

export type AeropuertosSchema = z.infer<typeof aeropuertosSchema>;

export const defaultValuesAeropuertos: AeropuertosSchema = {
  aeropuerto: "",
  codIATA: "",
  codOACI: "",
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
    .number({ message: "Sólo número de vuelo" })
    .min(1000, "Tiene que tener cuatro dígitos")
    .max(9999, "Tiene que tener cuatro dígitos"),
  origen: objectIdSchema.describe("Aeropuerto ID"),
  destino: objectIdSchema.describe("Aeropuerto ID"),
  empresa: objectIdSchema.describe("Empresa ID"),
});

export { codVueloSchema };

export type CodVueloSchema = z.infer<typeof codVueloSchema>;

export const defaultValuesCodVuelos: Partial<CodVueloSchema> = {
  empresa: "",
};
