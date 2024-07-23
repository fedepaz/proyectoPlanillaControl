import { Button, Container, Divider, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { PlanillaSchema, defaultValuesPlanilla } from "../types/planillaSchema";
import { useEffect } from "react";
import { DatosPsa } from "../components/planillaComponents/datosPsa";
import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";

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
          justifyContent="flex-start"
          sx={{ gap: 2, py: 3 }}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <DatosPsa />
          <DatosVuelo />
          <DatosTerrestre />

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit">New User</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
