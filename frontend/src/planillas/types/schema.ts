import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z.object({
  name: z.string().min(1, { message: "Campo requerido" }),
  email: z
    .string()
    .min(1, { message: "Email requerido" })
    .refine((text) => patterns.email.test(text), { message: "Email inválido" }),
});

export type Schema = z.infer<typeof schema>;
