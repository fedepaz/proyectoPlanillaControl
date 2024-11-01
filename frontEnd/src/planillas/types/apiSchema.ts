import { z } from "zod";

const oficialSchema = z.object({
  dni: z.string().regex(/^\d{8}$/, "El DNI debe tener 8 números"),
  firstname: z
    .string()
    .min(1, "El Nombre es requerido")
    .max(20, "El Nombre es muy largo"),
  lastname: z
    .string()
    .min(1, "El Apellido es requerido")
    .max(20, "El Apellido es muy largo"),
  legajo: z.string().regex(/^\d{6}$/, "Legajo debe tener 6 números"),
  id: z.string().optional(),
});

export { oficialSchema };

export type OficialSchema = z.infer<typeof oficialSchema>;

export const defaultValuesOficial: Partial<OficialSchema> = {
  firstname: "",
  lastname: "",
};

const personalEmpresaSchema = z.object({
  dni: z
    .number({ message: "Solo número se pueden ingresar" })
    .int()
    .min(30000000, "DNI insuficiente")
    .max(99999999, "El DNI no puede tener más de 9 dígitos"),
  firstname: z
    .string()
    .min(1, "El Nombre es requerido")
    .max(20, "El Nombre es muy largo"),
  lastname: z
    .string()
    .min(1, "El Apellido es requerido")
    .max(20, "El Apellido es muy largo"),
  empresa: z
    .string()
    .min(1, "La Empresa es requerida")
    .max(50, "El Nombre es muy largo"),
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
  empresa: "",
};

const personalSeguridadSchema = z.object({
  dni: z
    .number({ message: "Solo número se pueden ingresar" })
    .int()
    .min(30000000, "DNI insuficiente")
    .max(99999999, "El DNI no puede tener más de 9 dígitos"),
  firstname: z
    .string()
    .min(1, "El Nombre es requerido")
    .max(20, "El Nombre es muy largo"),
  lastname: z
    .string()
    .min(1, "El Apellido es requerido")
    .max(20, "El Apellido es muy largo"),
  empresa: z
    .string()
    .min(1, "La Empresa es requerida")
    .max(50, "El Nombre es muy largo"),
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
    empresa: "",
  };

const empresaSchema = z.object({
  empresa: z
    .string()
    .min(1, "La Empresa es requerida")
    .max(50, "El Nombre es muy largo"),
  tipoEmpresa: z.string().min(1, "TipoEmpresa requerido"),
});

export { empresaSchema };

export type EmpresaSchema = z.infer<typeof empresaSchema>;

export const defaultValuesEmpresa: EmpresaSchema = {
  empresa: "",
  tipoEmpresa: "",
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
  empresa: z
    .string()
    .min(1, "La Empresa es requerida")
    .max(50, "El Nombre es muy largo"),
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
  empresa: z
    .string()
    .min(1, "La Empresa es requerida")
    .max(50, "El Nombre es muy largo")
    .optional(),
  numInterno: z.string().min(1).optional(),
});

export { vehiculoSchema };

export type VehiculosSchema = z.infer<typeof vehiculoSchema>;

export const defaultValuesVehiculos: VehiculosSchema = {
  tipoVehiculo: "Cinta",
  empresa: "Aerolineas Argentinas",
  numInterno: "10587",
};

const codVueloSchema = z.object({
  codVuelo: z
    .number({ message: "Sólo número de vuelo" })
    .min(1000, "Tiene que tener cuatro dígitos")
    .max(9999, "Tiene que tener cuatro dígitos"),
  origen: z
    .string()
    .toUpperCase()
    .length(3, "Consiste en 3 letras del alfabeto latino"),
  destino: z
    .string()
    .toUpperCase()
    .length(3, "Consiste en 3 letras del alfabeto latino"),
  empresa: z
    .string()
    .min(1, "La Empresa es requerida")
    .max(50, "El Nombre es muy largo"),
});

export { codVueloSchema };

export type CodVueloSchema = z.infer<typeof codVueloSchema>;

export const defaultValuesCodVuelos: Partial<CodVueloSchema> = {
  origen: "",
  destino: "",
  empresa: "",
};
