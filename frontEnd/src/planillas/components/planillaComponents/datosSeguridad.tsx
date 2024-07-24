import { Stack, Divider, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
} from "../../types/planillaSchema";
import { SeguridadComponent } from "./components/seguridadComponent";

export function DatosSeguridad() {
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
            Datos Seguridad
          </Typography>
          <SeguridadComponent />
        </Stack>
      </form>
    </FormProvider>
  );
}
