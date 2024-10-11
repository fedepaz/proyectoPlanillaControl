import {
  Button,
  Container,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../types/planillaSchema";
import { useCallback, useEffect } from "react";
import { DatosPsa } from "../components/planillaComponents/datosPsa";
import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";
import { DatosSeguridad } from "./planillaComponents/datosSeguridad";
import { DatosVehiculos } from "./planillaComponents/datosVehiculos";
import { RHFTextField } from "../../components/RHFTextField";

interface PlanillaProps {
  onPlanillas: (fecha: string) => void;
  onBack: (data: boolean) => void;
}

export function Planillas({ onPlanillas, onBack }: PlanillaProps) {
  const { setValue } = useFormContext<PlanillaSchema>();

  useEffect(() => {
    console.log("Mensaje de planillas lalala");
  }, []);

  const handleDatosPsaSelected = useCallback(
    (fecha: string) => {
      console.log(fecha + " Planillas");
      setValue("datosPsa.fecha", fecha);
      onPlanillas(fecha);
    },
    [setValue, onPlanillas]
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sendBack = () => {
    onBack(false);
  };

  return (
    <Container
      maxWidth={isMobile ? "sm" : "md"}
      sx={{
        pb: isMobile ? 4 : 2,
        overflowY: "auto",
      }}
    >
      <Stack
        sx={{
          gap: 1,
          minHeight: "100vh",
          justifyContent: "space-between",
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

        <Stack
          sx={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Generar Planilla{" "}
          </Button>
          <Button
            type="button"
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={sendBack}
          >
            Regresar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
