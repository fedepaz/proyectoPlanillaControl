import { FormProvider, useForm } from "react-hook-form";
import { Planillas } from "./Planillas";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
  planillaSchema,
} from "../types/planillaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useOficial } from "../services/queries";
import { OficialSchema } from "../types/apiSchema";
import { useUserContext } from "../../services/useUserContext";
import { useSession } from "../../services/session";

interface PlanillasProviderProps {
  onBack: (data: boolean) => void;
}
//interface LoginResponse {
//  user: {
//    dni: string;
//    oficialId: {
//      dni: string;
//      firstname: string;
//      lastname: string;
//      legajo: string;
//    };
//  };
//}

export function PlanillasProvider({ onBack }: PlanillasProviderProps) {
  const methods = useForm<PlanillaSchema>({
    mode: "all",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });
  const { setValue, handleSubmit } = methods;

  const { data, error } = useSession();

  useEffect(() => {
    if (data && !error) {
      setValue("datosPsa.responsable", data?.user.oficialId.id);
    }
  }, [data, setValue, error]);

  const onSubmit = async (data: PlanillaSchema) => {
    console.log("Form submitted with data:", data);
    try {
      const validationResult = planillaSchema.safeParse(data);

      console.log("Validation passed " + validationResult);
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  const sendBack = (data: boolean) => {
    onBack(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Planillas onBack={sendBack} />
      </form>
    </FormProvider>
  );
}
