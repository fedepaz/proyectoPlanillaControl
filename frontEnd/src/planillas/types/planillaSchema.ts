import { z } from "zod";

const planillaSchema = z
  .object({
    datosPsa: z.object({
      fecha: z.string().min(1),
      responsable: z
        .number()
        .min(1, "Legajo es requerido")
        .max(6, "El Legajo no puede tener más de 6 dígitos"),
      horaIni: z.string().time(),
      horaFin: z.string().time(),
      cant: z.string().min(1),
      tipoControl: z.string().min(1),
      medioTec: z.string().min(1),
      tipoPro: z.string().min(1),
    }),
    datosVuelo: z.object({
      aerolinea: z.string().min(1),
      codVuelo: z.string().min(1),
      origen: z.string().min(1),
      destino: z.string().min(1),
      horaArribo: z.string().min(1),
      horaPartida: z.string().min(1),
      demora: z.string().min(1),
      tipoVuelo: z.string().min(1),
      matriculaAeronave: z.string().min(1),
      posicion: z.string().min(1),
    }),
    datosTerrestre: z.array(
      z.object({
        dniTerrestre: z
          .number({ message: "Solo número se pueden ingresar" })
          .int()
          .min(30000000, "DNI insuficiente")
          .max(99999999, "El DNI no puede tener más de 9 dígitos"),
        apellidoTerrestre: z.string().min(1),
        nombreTerrestre: z.string().min(1),
        legajoTerrestre: z
          .number({ message: "Solo número se pueden ingresar" })
          .int()
          .min(1, "Legajo insuficiente")
          .max(999999, "El Legajo no existe"),
        funcion: z.string().min(1),
        grupo: z.string().min(1),
      })
    ),
    datosSeguridad: z.array(
      z.object({
        apellidoSeguridad: z.string().min(1),
        nombreSeguridad: z.string().min(1),
        dniSeguridad: z
          .number({ message: "Solo número se pueden ingresar" })
          .int()
          .min(30000000, "DNI insuficiente")
          .max(99999999, "El DNI no puede tener más de 9 dígitos"),
        legajoSeguridad: z
          .number({ message: "Solo número se pueden ingresar" })
          .int()
          .min(1, "Legajo insuficiente")
          .max(999999, "El Legajo no existe"),
        empresaSeguridad: z.string().min(1),
      })
    ),
    datosVehiculos: z.array(
      z.object({
        tipoVehiculo: z.string().min(1),
        empresaVehiculo: z.string().min(1),
        numInterno: z.string().min(1),
        operadorVehiculo: z.string().min(1),
        observacionesVehiculo: z.string().min(1),
      })
    ),
    novEquipajes: z.string().min(1),
    novInspeccion: z.string().min(1),
    novOtras: z.string().min(1),
  })
  .strict();

export { planillaSchema };

export type PlanillaSchema = z.infer<typeof planillaSchema>;

export const defaultValuesPlanilla: PlanillaSchema = {
  datosPsa: {
    fecha: "",
    responsable: "",
    horaIni: "00:00:00",
    horaFin: "00:00:00",
    cant: "",
    tipoControl: "",
    medioTec: "",
    tipoPro: "",
  },
  datosVuelo: {
    aerolinea: "",
    codVuelo: "",
    origen: "",
    destino: "",
    horaArribo: "",
    horaPartida: "",
    demora: "",
    tipoVuelo: "",
    matriculaAeronave: "",
    posicion: "",
  },
  datosTerrestre: [
    {
      dniTerrestre: "",
      apellidoTerrestre: "",
      nombreTerrestre: "",
      legajoTerrestre: "",
      funcion: "",
      grupo: "",
    },
  ],
  datosSeguridad: [
    {
      apellidoSeguridad: "",
      nombreSeguridad: "",
      dniSeguridad: "",
      legajoSeguridad: "",
      empresaSeguridad: "",
    },
  ],
  datosVehiculos: [
    {
      tipoVehiculo: "",
      empresaVehiculo: "",
      numInterno: "",
      operadorVehiculo: "",
      observacionesVehiculo: "",
    },
  ],
  novEquipajes: "Equipaje Roto",
  novInspeccion: "Alguna Boludez",
  novOtras: "Pasó un pájaro",
};
