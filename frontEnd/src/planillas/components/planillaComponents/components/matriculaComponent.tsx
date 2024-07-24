import { FormLabel, Stack } from "@mui/material";
import { RHFTextField } from "../../../../components/RHFTextField";
import {
  defaultValuesMatricula,
  MatriculaAeronaveSchema,
} from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";

export function MatriculaComponent() {
  const methods = useForm<MatriculaAeronaveSchema>({
    defaultValues: defaultValuesMatricula,
  });
  return (
    <FormProvider {...methods}>
      <form>
        <Stack sx={{ gap: 1 }}>
          <FormLabel>Responsable</FormLabel>
          <RHFTextField<MatriculaAeronaveSchema>
            name="matriculaAeronave"
            label="Matrícula"
          />
          <RHFTextField<MatriculaAeronaveSchema>
            name="empresa"
            label="Empresa"
          />
        </Stack>
      </form>
    </FormProvider>
  );
}
