import { Stack } from "@mui/material";
import { RHFTextField } from "../../../../components/RHFTextField";
import {
  defaultValuesCodVuelos,
  CodVueloSchema,
  codVueloSchema,
} from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function CodVueloComponent() {
  const methods = useForm<CodVueloSchema>({
    resolver: zodResolver(codVueloSchema),
    defaultValues: defaultValuesCodVuelos,
    mode: "onChange",
  });
  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <RHFTextField<CodVueloSchema>
          name="codVuelo"
          label="Código Vuelo"
          valueAsNumber
        />
        <RHFTextField<CodVueloSchema> name="origen" label="Origen" />
        <RHFTextField<CodVueloSchema> name="destino" label="Destino" />
        <RHFTextField<CodVueloSchema> name="empresa" label="Empresa" />
      </Stack>
    </FormProvider>
  );
}
