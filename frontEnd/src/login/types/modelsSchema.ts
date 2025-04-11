import { z } from "zod";

const loginSchema = z.object({
  dni: z.string().regex(/^\d{8}$/, "El DNI debe tener 8 números"),
  password: z
    .string()
    .min(10, "La contraseña debe tener al menos 10 caracteres"),
});
export { loginSchema };

export type LoginSchema = z.infer<typeof loginSchema>;

export const defaultValuesLogin: Partial<LoginSchema> = {
  dni: "",
  password: "",
};

const registerSchema = z.object({
  dni: z.string().regex(/^\d{8}$/, "El DNI debe tener 8 números"),
  password: z
    .string()
    .min(10, "La contraseña debe tener al menos 10 caracteres"),
  email: z.string().email("El email no es válido"),
  firstname: z
    .string()
    .min(1, "El Nombre es requerido")
    .max(50, "El Nombre es muy largo"),
  lastname: z
    .string()
    .min(1, "El Apellido es requerido")
    .max(50, "El Apellido es muy largo"),
  legajo: z
    .number()
    .int()
    .min(500000, "Legajo no corresponde")
    .max(600000, "Legajo no corresponde"),
});

export { registerSchema };

export type RegisterSchema = z.infer<typeof registerSchema>;

export const defaultValuesRegister: Partial<RegisterSchema> = {
  dni: "",
  email: "",
  password: "",
  firstname: "",
  lastname: "",
};

const credentialsSchema = z.object({
  password: z
    .string()
    .min(10, "La contraseña debe tener al menos 10 caracteres"),
  email: z.string().email("El email no es válido"),
});

export { credentialsSchema };

export type CredentialsSchema = z.infer<typeof credentialsSchema>;

export const defaultValuesCredentials: Partial<CredentialsSchema> = {
  password: "",
  email: "",
};

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
  legajo: z
    .string()
    .regex(/^\d{6}$/, "Legajo debe tener 6 números")
    .refine((val) => {
      const num = parseInt(val, 10);
      return num >= 500000 && num <= 600000;
    }, "Legajo no corresponde"),
});

export { oficialSchema };

export type OficialSchema = z.infer<typeof oficialSchema>;

export const defaultValuesOficial: Partial<OficialSchema> = {
  firstname: "",
  lastname: "",
};

const logoutSchema = z.object({
  email: z.string().email("El email no es válido"),
});

export { logoutSchema };

export type LogoutSchema = z.infer<typeof logoutSchema>;

export const defaultValuesLogout: Partial<LogoutSchema> = {
  email: "",
};
