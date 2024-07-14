import { FormProvider, useForm } from "react-hook-form";
import { Planillas } from "./Planillas";
import { Schema, defaultValues, planillaSchema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function PlanillasProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(planillaSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Planillas />
    </FormProvider>
  );
}
