import Stack from "@mui/material/Stack";
import { RHFTextField } from "../../../../components/RHFTextField";
import { PersonalEmpresaSchema } from "../../../types/apiSchema";

export function PersonalComponent() {
  return (
    <Stack sx={{ gap: 1 }}>
      <RHFTextField<PersonalEmpresaSchema> name="dni" label="DNI" />
      <RHFTextField<PersonalEmpresaSchema> name="firstname" label="Nombre" />
      <RHFTextField<PersonalEmpresaSchema> name="lastname" label="Apellido" />
      <RHFTextField<PersonalEmpresaSchema> name="empresa" label="Empresa" />
      <RHFTextField<PersonalEmpresaSchema> name="legajo" label="Legajo" />
    </Stack>
  );
}
