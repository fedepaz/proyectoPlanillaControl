import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z
  .intersection(
    z.object({
      name: z.string().min(1, { message: "Campo requerido" }),
      email: z
        .string()
        .min(1, { message: "Email requerido" })
        .refine((text) => patterns.email.test(text), {
          message: "Email inválido",
        }),
      tipoControl: z.array(z.string()).min(1, { message: "Requerido" }).max(2),
      funcion: z
        .array(z.string())
        .min(1, { message: "Requerido" })
        .max(2, { message: "Máximo dos opciones..." }),
      demora: z.string().min(1, { message: "Requerido" }),
      mediosTec: z
        .array(z.string())
        .min(1, { message: "Requerido" })
        .max(2, { message: "Máximo dos opciones..." }),

      tipoPro: z.array(z.string()).min(1, { message: "Requerido" }).max(2),
      tipoVuelo: z.string().min(1, { message: "Requerido" }),
      registrationDateAndTime: z.date(),
      formerEmploymentPeriod: z.array(z.date()).max(2).min(2),
      salartRange: z.array(z.number()).min(2).max(2),
    }),
    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), _id: z.string().min(1) }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(z.object({ name: z.string().min(4) })),
      }),
    ])
  );

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  isTeacher: false,
  email: "",
  name: "",
  tipoControl: [],
  mediosTec: [],
  tipoPro: [],
  demora: "",
  tipoVuelo: "",
  funcion: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salartRange: [0.9999999],
};
