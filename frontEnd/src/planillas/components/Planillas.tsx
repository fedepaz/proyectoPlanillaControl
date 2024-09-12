import {
  Button,
  Container,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../types/planillaSchema";
import { useCallback, useEffect } from "react";
import { DatosPsa } from "../components/planillaComponents/datosPsa";
import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";
import { DatosSeguridad } from "./planillaComponents/datosSeguridad";
import { DatosVehiculos } from "./planillaComponents/datosVehiculos";
import { RHFTextField } from "../../components/RHFTextField";
import { useCreatePlanilla } from "../services/mutations";

interface PlanillaProps {
  onPlanillas: (fecha: string) => void;
}

export function Planillas({ onPlanillas }: PlanillaProps) {
  const { setValue, handleSubmit } = useFormContext<PlanillaSchema>();

  useEffect(() => {
    onPlanillas("Mensaje de planillas");
  });

  const createPlanillaMutation = useCreatePlanilla();

  const onSubmit: SubmitHandler<PlanillaSchema> = (data) => {
    console.log("submit " + data);
    createPlanillaMutation.mutate(data);
  };

  const handleDatosPsaSelected = useCallback(
    (fecha: string) => {
      console.log(fecha + " Planillas");
      setValue("datosPsa.fecha", fecha);
    },
    [setValue]
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth={isMobile ? "sm" : "md"}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        sx={{
          gap: 1,
          border: "1px solid blue",
          padding: theme.spacing(2),
        }}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        {/*
            fecha: string;
            responsable: string;
            horaIni: string;
            horaFin: string;
            cant: string;
            tipoControl: string;
            medioTec: string;
            tipoPro: string;
           */}
        <DatosPsa onDatosPsaSelected={handleDatosPsaSelected} />
        {/*aerolinea: string;
            codVuelo: string;
            origen: string;
            destino: string;
            horaArribo: string;
            horaPartida: string;
            demora: string;
            tipo: string;
            matriculaAeronave: string;
            posicion: string;
            
            */}
        <DatosVuelo />
        {/*apellidoTerrestre: string;
            nombreTerrestre: string;
            dniTerrestre: string;
            legajoTerrestre: string;
            funcion: string;
            grupo: string;
            
            */}
        <DatosTerrestre />
        {/*apellidoSeguridad: string;
            nombreSeguridad: string;
            dniSeguridad: string;
            legajoSeguridad: string;
            empresaSeguridad: string;
           */}
        <DatosSeguridad />
        {/*tipoVehiculo: string;
             empresaVehiculo: string;
             numInterno: string;
             operadorVehiculo: string;
             observacionesVehiculo: string;
             */}
        <DatosVehiculos />
        {/*novEquipajes: string;*/}
        <RHFTextField<PlanillaSchema>
          name="novEquipajes"
          label="Novedades Equipajes"
        />
        {/*novInspeccion: string;*/}
        <RHFTextField<PlanillaSchema>
          name="novInspeccion"
          label="Novedades Inspección"
        />
        {/*novOtras: string;*/}
        <RHFTextField<PlanillaSchema> name="novOtras" label="Otras Novedades" />

        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            size={isMobile ? "large" : "medium"}
            sx={{
              mt: 2,
              position: "sticky",
              bottom: theme.spacing(2),
              zIndex: 1,
            }}
          >
            Nueva Planilla
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
