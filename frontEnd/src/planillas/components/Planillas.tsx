import { Button, Container, Divider, Grid, Stack } from "@mui/material";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../types/planillaSchema";
import { useEffect } from "react";
import { DatosPsa } from "../components/planillaComponents/datosPsa";
import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";
import { DatosSeguridad } from "./planillaComponents/datosSeguridad";
import { DatosVehiculos } from "./planillaComponents/datosVehiculos";
import { RHFTextField } from "../../components/RHFTextField";
import { useCreatePlanilla } from "../services/mutations";

export function Planillas() {
  const { watch, control, unregister, reset, setValue, handleSubmit } =
    useFormContext<PlanillaSchema>();

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
      value;
    });
    return () => sub.unsubscribe();
  }, [watch]);

  /*
  
  const handleOfiClick = (_id: string) => {
    setValue("datosPsa.responsable", _id);
  };

  */

  const createPlanillaMutation = useCreatePlanilla();

  const onSubmit: SubmitHandler<PlanillaSchema> = (data) => {
    console.log("submit " + data);
    createPlanillaMutation.mutate(data);
  };

  const handleDatosPsaSelected = (fecha: string) => {
    setValue("datosPsa.fecha", fecha);
  };

  return (
    <Container maxWidth="xs" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack
        sx={{ gap: 2, py: 3 }}
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
          <Button variant="contained" type="submit">
            Nueva Planilla
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
