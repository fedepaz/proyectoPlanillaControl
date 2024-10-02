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
