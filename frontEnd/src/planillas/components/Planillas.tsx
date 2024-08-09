import { Button, Container, Divider, Stack } from "@mui/material";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../types/planillaSchema";
import { useCallback, useEffect, useRef } from "react";
import DatosPsa from "../components/planillaComponents/datosPsa";
import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";
import { DatosSeguridad } from "./planillaComponents/datosSeguridad";
import { DatosVehiculos } from "./planillaComponents/datosVehiculos";
import { RHFTextField } from "../../components/RHFTextField";
import { useCreatePlanilla } from "../services/mutations";
import React from "react";

interface PlanillaProps {
  onPlanillas: (fecha: string) => void;
}

function Planillas({ onPlanillas }: PlanillaProps) {
  const { watch, setValue, handleSubmit } = useFormContext<PlanillaSchema>();
  const prevValuesRef = useRef();

  useEffect(() => {
    const subscription = watch((currentValues) => {
      const prevValues = prevValuesRef.current || {};
      const changedValues: Partial<PlanillaSchema> = {};

      // Compare previous values with current values to find changes
      for (const key in currentValues) {
        if (currentValues[key] !== prevValues[key]) {
          changedValues[key] = currentValues[key];
        }
      }

      // Log only the changed values
      for (const key in changedValues) {
        console.log(`${key} - ${changedValues[key]}`);
        console.log(changedValues[key]);
      }

      // Update previous values
      prevValuesRef.current = currentValues;
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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

export default React.memo(Planillas);
