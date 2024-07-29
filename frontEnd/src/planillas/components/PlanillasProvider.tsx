import { FormProvider, useForm } from "react-hook-form";
import { Planillas } from "./Planillas";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
  planillaSchema,
} from "../types/planillaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { Grid } from "@mui/material";

export function PlanillasProvider() {
  const methods = useForm<PlanillaSchema>({
    mode: "all",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });

  return (
    <FormProvider {...methods}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        maxWidth="small"
      >
        <Planillas />
        <DevTool control={methods.control} />
      </Grid>
    </FormProvider>
  );
}
