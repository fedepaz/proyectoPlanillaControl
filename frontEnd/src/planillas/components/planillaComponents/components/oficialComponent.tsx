import { FormLabel, Stack } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useOficial } from "../../../services/queries";
import {
  OficialSchema,
  oficialSchema,
  defaultValuesOficial,
} from "../../../types/apiSchema";
import { RHFTextField } from "../../../../components/RHFTextField";

interface OficialComponentProps {
  onOficialSelected: (legajo: number) => void;
}

export function OficialComponent({ onOficialSelected }: OficialComponentProps) {
  const methods = useForm<OficialSchema>({
    resolver: zodResolver(oficialSchema),
    defaultValues: defaultValuesOficial,
    mode: "onChange",
  });

  const { setValue, watch, trigger } = methods;
  const [isNewOficial, setIsNewOficial] = useState(false);
  const [dniToCheck, setDniToCheck] = useState<number>(0);

  const dni = watch("dni");
  const { data: oficial, refetch } = useOficial(dniToCheck);

  const handleDniBlur = () => {
    if (dni && dni !== dniToCheck) {
      setDniToCheck(dni);
    }
  };

  useEffect(() => {
    if (dniToCheck) {
      console.log(dniToCheck + " oficialComponent");
      refetch();
    }
  }, [dniToCheck, refetch]);

  useEffect(() => {
    if (oficial) {
      onOficialSelected(oficial.legajo);
      setValue("firstname", oficial.firstname);
      setValue("lastname", oficial.lastname);
      setValue("legajo", oficial.legajo);
      setIsNewOficial(false);
      trigger();
    } else if (dniToCheck) {
      setIsNewOficial(true);
    }
  }, [oficial, dniToCheck, onOficialSelected, setValue, trigger, isNewOficial]);

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <FormLabel>Oficial</FormLabel>
        <RHFTextField<OficialSchema>
          name="dni"
          label="DNI"
          valueAsNumber
          onBlur={handleDniBlur}
        />
        <RHFTextField<OficialSchema>
          name="firstname"
          label="Nombre"
          disabled={!!oficial}
        />
        <RHFTextField<OficialSchema>
          name="lastname"
          label="Apellido"
          disabled={!!oficial}
        />
        <RHFTextField<OficialSchema>
          name="legajo"
          label="Legajo"
          valueAsNumber
          disabled={!!oficial}
        />
      </Stack>
    </FormProvider>
  );
}
