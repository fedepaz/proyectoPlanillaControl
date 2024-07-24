import { FormLabel, Stack } from "@mui/material";
import { RHFTextField } from "../../../../components/RHFTextField";
import {
  defaultValuesAeropuertos,
  AeropuertosSchema,
} from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  label: string;
};

export function AeropuertoComponent({ label }: Props) {
  const methods = useForm<AeropuertosSchema>({
    defaultValues: defaultValuesAeropuertos,
  });
  return (
    <FormProvider {...methods}>
      <form>
        <Stack sx={{ gap: 1 }}>
          <FormLabel>{label}</FormLabel>
          <RHFTextField<AeropuertosSchema>
            name="aeropuerto"
            label="Aeropuerto"
          />
          <RHFTextField<AeropuertosSchema> name="codIATA" label="Código IATA" />
          <RHFTextField<AeropuertosSchema> name="codOACI" label="Código OACI" />
        </Stack>
      </form>
    </FormProvider>
  );
}
