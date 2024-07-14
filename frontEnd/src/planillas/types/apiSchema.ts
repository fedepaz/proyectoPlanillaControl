import { z } from "zod";

const oficialSchema = z.object({
  dni: z.number(),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  legajo: z.number().max(6),
});

export { oficialSchema };

export type OficialSchema = z.infer<typeof oficialSchema>;

export const defaultValuesOficial: OficialSchema = {
  dni: 0,
  firstname: "",
  lastname: "",
  legajo: 555555,
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
  dni: "",
  firstname: "",
  lastname: "",
  empresa: "",
  legajo: "",
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
  dni: "",
  firstname: "",
  lastname: "",
  empresa: "",
  legajo: "",
};
