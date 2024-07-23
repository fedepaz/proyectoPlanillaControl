import { FormProvider, useForm } from "react-hook-form";
import { Planillas } from "./Planillas";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
  planillaSchema,
} from "../types/planillaSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function PlanillasProvider() {
  const methods = useForm<PlanillaSchema>({
    mode: "all",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });

  return (
    <FormProvider {...methods}>
      <Planillas />
    </FormProvider>
  );
}
