import { FormProvider, useForm } from "react-hook-form";
import Planillas from "./Planillas";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
  planillaSchema,
} from "../types/planillaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

export function PlanillasProvider() {
  const methods = useForm<PlanillaSchema>({
    mode: "all",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });
  const { setValue } = methods;

  const handlePlanillaSelected = useCallback(
    (mensaje: string) => {
      console.log(mensaje + " PlanillasProvider");
      setValue("novOtras", mensaje);
    },
    [setValue]
  );

  return (
    <FormProvider {...methods}>
      <Planillas onPlanillas={handlePlanillaSelected} />
    </FormProvider>
  );
}
