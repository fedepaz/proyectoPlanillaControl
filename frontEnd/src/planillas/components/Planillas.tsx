import { Button, Container, Divider, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { PlanillaSchema, defaultValuesPlanilla } from "../types/planillaSchema";
import { useEffect } from "react";
import { DatosPsa } from "../components/planillaComponents/datosPsa";
import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";
import { DatosSeguridad } from "./planillaComponents/datosSeguridad";
import { DatosVehiculos } from "./planillaComponents/datosVehiculos";
import { RHFTextField } from "../../components/RHFTextField";

export function Planillas() {
  //const oficialQuery = useOficial();

  const { watch, reset } = useFormContext<PlanillaSchema>();

  useEffect(() => {
    const sub = watch((value) => {
      value;
    });
    return () => sub.unsubscribe();
  }, [watch]);
  /*
  const ofiQuery = useOfi(_id);
  
  const handleOfiClick = (_id: string) => {
    setValue("datosPsa.responsable", _id);
  };

  useEffect(() => {
    if (ofiQuery.data) {
      reset(ofiQuery.data);
    }
  }, [reset, ofiQuery.data]);
*/
  const handleReset = () => {
    reset(defaultValuesPlanilla);
  };

  return (
    <Container maxWidth="sm" component="form">
      <Stack sx={{ flexDirection: "row" }}>
        <Stack
          useFlexGap
          flexWrap="wrap"
          justifyContent="flex-start"
          sx={{ gap: 2, py: 3 }}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <DatosPsa />
          {/*
           */}
          <DatosVuelo />
          <DatosTerrestre />
          <DatosSeguridad />
          <DatosVehiculos />
          <RHFTextField<PlanillaSchema>
            name="novEquipajes"
            label="Novedades Equipajes"
          />
          <RHFTextField<PlanillaSchema>
            name="novInspeccion"
            label="Novedades Inspección"
          />
          <RHFTextField<PlanillaSchema>
            name="novOtras"
            label="Otras Novedades"
          />

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit">New User</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
