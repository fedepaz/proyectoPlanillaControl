import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z.object({
  name: z.string().min(1, { message: "Campo requerido" }),
  email: z
    .string()
    .min(1, { message: "Email requerido" })
    .refine((text) => patterns.email.test(text), { message: "Email inválido" }),
  tipoControl: z.array(z.string()).min(1, { message: "Requerido" }).max(2),
  mediosTec: z.array(z.string()).min(1, { message: "Requerido" }).max(2),
  tipoPro: z.array(z.string()).min(1, { message: "Requerido" }).max(2),
  demora: z.string().min(1, { message: "Requerido" }),
  tipoVuelo: z.string().min(1, { message: "Requerido" }),
  funcion: z.array(z.string()).min(1, { message: "Requerido" }).max(2),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  email: "",
  name: "",
  tipoControl: [],
  mediosTec: [],
  tipoPro: [],
  demora: "",
  tipoVuelo: "",
  funcion: [],
};
