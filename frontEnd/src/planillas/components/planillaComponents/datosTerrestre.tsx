import { Stack, Divider, Typography } from "@mui/material";
import { RHFTextField } from "../../../components/RHFTextField";
import {
  defaultValuesPlanilla,
  PlanillaSchema,
} from "../../types/planillaSchema";
import { PersonalComponent } from "./components/personalComponent";
import { RHFToggleButtonGroup } from "../../../components/RHFToggleButtonGroup";
import { useFuncion } from "../../services/queries";
import { FormProvider, useForm } from "react-hook-form";

export function DatosTerrestre() {
  const funcionQuery = useFuncion();
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
          <Typography variant="h6" align="center" gutterBottom>
            Datos Terrestre
          </Typography>
          <PersonalComponent />

          <RHFToggleButtonGroup<PlanillaSchema>
            name="datosTerrestre.0.funcion"
            options={funcionQuery.data}
            label="Función"
          />
          <RHFTextField<PlanillaSchema>
            name="datosTerrestre.0.grupo"
            label="Grupo"
          />
        </Stack>
      </form>
    </FormProvider>
  );
}
