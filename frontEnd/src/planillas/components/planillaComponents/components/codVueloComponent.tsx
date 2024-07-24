import { Stack } from "@mui/material";
import { RHFTextField } from "../../../../components/RHFTextField";
import {
  defaultValuesCodVuelos,
  CodVueloSchema,
} from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";

export function CodVueloComponent() {
  const methods = useForm<CodVueloSchema>({
    defaultValues: defaultValuesCodVuelos,
  });
  return (
    <FormProvider {...methods}>
      <form>
        <Stack sx={{ gap: 1 }}>
          <RHFTextField<CodVueloSchema> name="codVuelo" label="Código Vuelo" />
          <RHFTextField<CodVueloSchema> name="origen" label="Origen" />
          <RHFTextField<CodVueloSchema> name="destino" label="Destino" />
          <RHFTextField<CodVueloSchema> name="empresa" label="Empresa" />
        </Stack>
      </form>
    </FormProvider>
  );
}
