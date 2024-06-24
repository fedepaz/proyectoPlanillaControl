import { FormProvider, useForm } from "react-hook-form";
import { Planillas } from "./Planillas";
import { Schema, defaultValues, schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function PlanillasProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Planillas />
    </FormProvider>
  );
}
