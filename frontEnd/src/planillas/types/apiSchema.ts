import { z } from "zod";

const oficialSchema = z.object({
  dni: z.string().min(1),
  firstname: z.string().min(1).max(5),
  lastname: z.string().min(1),
  legajo: z.string().min(1),
});

export { oficialSchema };

export type OficialSchema = z.infer<typeof oficialSchema>;

export const defaultValuesOficial: OficialSchema = {
  dni: "34617839",
  firstname: "Fede",
  lastname: "Paz",
  legajo: "505771",
};

const personalEmpresaSchema = z.object({
  dni: z.string().min(1),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  empresa: z.string().min(1),
  legajo: z.string().min(1),
});

export { personalEmpresaSchema };

export type PersonalEmpresaSchema = z.infer<typeof personalEmpresaSchema>;

export const defaultValuesPersonalEmpresa: PersonalEmpresaSchema = {
  dni: "35189189",
  firstname: "Alguno",
  lastname: "Otro",
  empresa: "Serza",
  legajo: "8555",
};

const personalSeguridadSchema = z.object({
  dni: z.string().min(1),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  empresa: z.string().min(1),
  legajo: z.string().min(1),
});

export { personalSeguridadSchema };

export type PersonalSeguridadSchema = z.infer<typeof personalSeguridadSchema>;

export const defaultValuesPersonalSeguridad: PersonalSeguridadSchema = {
  dni: "35189189",
  firstname: "Alguno",
  lastname: "Otro",
  empresa: "GPS",
  legajo: "8555",
};

const empresaSchema = z.object({
  empresa: z.string().min(1),
});

export { empresaSchema };

export type EmpresaSchema = z.infer<typeof empresaSchema>;

export const defaultValuesEmpresa: EmpresaSchema = {
  empresa: "Aerolineas Argentinas",
};

const matriculaAeronaveSchema = z.object({
  matriculaAeronave: z.string().min(1),
  empresa: z.string().min(1),
});
export { matriculaAeronaveSchema };

export type MatriculaAeronaveSchema = z.infer<typeof matriculaAeronaveSchema>;

export const defaultValuesMatricula: MatriculaAeronaveSchema = {
  matriculaAeronave: "LV-ZFO",
  empresa: "Aerolineas Argentinas",
};

const aeropuertosSchema = z.object({
  aeropuerto: z.string().min(1),
  codIATA: z.string().toUpperCase().min(1).max(3),
  codOACI: z.string().toUpperCase().min(1).max(4),
});

export { aeropuertosSchema };

export type AeropuertosSchema = z.infer<typeof aeropuertosSchema>;

export const defaultValuesAeropuertos: AeropuertosSchema = {
  aeropuerto: "Mendoza",
  codIATA: "DOZ",
  codOACI: "SAME",
};

const vehiculoSchema = z.object({
  tipoVehiculo: z.string().min(1),
  empresa: z.string().min(1),
  numInterno: z.string().min(1),
});

export { vehiculoSchema };

export type VehiculosSchema = z.infer<typeof vehiculoSchema>;

export const defaultValuesVehiculos: VehiculosSchema = {
  tipoVehiculo: "Cinta",
  empresa: "Aerolineas Argentinas",
  numInterno: "10587",
};

const codVueloSchema = z.object({
  codVuelo: z.string().min(1),
  origen: z.string().min(1),
  destino: z.string().min(1),
  empresa: z.string().min(1),
});

export { codVueloSchema };

export type CodVueloSchema = z.infer<typeof codVueloSchema>;

export const defaultValuesCodVuelos: CodVueloSchema = {
  codVuelo: "1805",
  origen: "DOZ",
  destino: "AEP",
  empresa: "Aerolineas Argentinas",
};
