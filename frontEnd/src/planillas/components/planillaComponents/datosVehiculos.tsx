import { Stack, Divider } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
} from "../../types/planillaSchema";
import { VehiculoComponent } from "./components/vehiculoComponent";
import { RHFTextField } from "../../../components/RHFTextField";

export function DatosVehiculos() {
  const methods = useForm<PlanillaSchema>({
    defaultValues: defaultValuesPlanilla,
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Stack
          justifyContent="center"
          sx={{ gap: 2, py: 3 }}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <VehiculoComponent />
          <RHFTextField<PlanillaSchema>
            name="datosVehiculos.0.operadorVehiculo"
            label="Operador"
          />
          <RHFTextField<PlanillaSchema>
            name="datosVehiculos.0.observacionesVehiculo"
            label="Observaciones"
          />
        </Stack>
      </form>
    </FormProvider>
  );
}
