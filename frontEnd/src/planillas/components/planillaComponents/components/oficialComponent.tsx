import { FormLabel, Stack } from "@mui/material";
import { RHFTextField } from "../../../../components/RHFTextField";
import { defaultValuesOficial, OficialSchema } from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";

export function OficialComponent() {
  const methods = useForm<OficialSchema>({
    defaultValues: defaultValuesOficial,
  });
  return (
    <FormProvider {...methods}>
      <form>
        <Stack sx={{ gap: 1 }}>
          <FormLabel>Responsable</FormLabel>
          <RHFTextField<OficialSchema> name="dni" label="DNI" />
          <RHFTextField<OficialSchema> name="firstname" label="Nombre" />
          <RHFTextField<OficialSchema> name="lastname" label="Apellido" />
          <RHFTextField<OficialSchema> name="legajo" label="Legajo" />
        </Stack>
      </form>
    </FormProvider>
  );
}
