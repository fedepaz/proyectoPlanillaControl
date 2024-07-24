import Stack from "@mui/material/Stack";
import { RHFTextField } from "../../../../components/RHFTextField";
import {
  defaultValuesEmpresa,
  defaultValuesPersonalEmpresa,
  PersonalEmpresaSchema,
} from "../../../types/apiSchema";
import { FormLabel } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

export function PersonalComponent() {
  const methods = useForm<PersonalEmpresaSchema>({
    defaultValues: defaultValuesPersonalEmpresa,
  });
  return (
    <FormProvider {...methods}>
      <form>
        <Stack sx={{ gap: 1 }}>
          <FormLabel>Personal Empresa</FormLabel>
          <RHFTextField<PersonalEmpresaSchema> name="dni" label="DNI" />
          <RHFTextField<PersonalEmpresaSchema>
            name="firstname"
            label="Nombre"
          />
          <RHFTextField<PersonalEmpresaSchema>
            name="lastname"
            label="Apellido"
          />
          <RHFTextField<PersonalEmpresaSchema> name="empresa" label="Empresa" />
          <RHFTextField<PersonalEmpresaSchema> name="legajo" label="Legajo" />
        </Stack>
      </form>
    </FormProvider>
  );
}
