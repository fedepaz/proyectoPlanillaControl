import Stack from "@mui/material/Stack";
import { RHFTextField } from "../../../../components/RHFTextField";
import {
  defaultValuesPersonalSeguridad,
  PersonalSeguridadSchema,
} from "../../../types/apiSchema";
import { FormLabel } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

export function SeguridadComponent() {
  const methods = useForm<PersonalSeguridadSchema>({
    defaultValues: defaultValuesPersonalSeguridad,
  });
  return (
    <FormProvider {...methods}>
      <form>
        <Stack sx={{ gap: 1 }}>
          <FormLabel>Personal Seguridad</FormLabel>
          <RHFTextField<PersonalSeguridadSchema> name="dni" label="DNI" />
          <RHFTextField<PersonalSeguridadSchema>
            name="firstname"
            label="Nombre"
          />
          <RHFTextField<PersonalSeguridadSchema>
            name="lastname"
            label="Apellido"
          />
          <RHFTextField<PersonalSeguridadSchema>
            name="empresa"
            label="Empresa"
          />
          <RHFTextField<PersonalSeguridadSchema> name="legajo" label="Legajo" />
        </Stack>
      </form>
    </FormProvider>
  );
}
