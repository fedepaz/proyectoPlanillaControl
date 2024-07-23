import Stack from "@mui/material/Stack";
import { RHFTextField } from "../../../../components/RHFTextField";
import { PersonalSeguridadSchema } from "../../../types/apiSchema";

export function SeguridadComponent() {
  return (
    <Stack sx={{ gap: 1 }}>
      <RHFTextField<PersonalSeguridadSchema> name="dni" label="DNI" />
      <RHFTextField<PersonalSeguridadSchema> name="firstname" label="Nombre" />
      <RHFTextField<PersonalSeguridadSchema> name="lastname" label="Apellido" />
      <RHFTextField<PersonalSeguridadSchema> name="empresa" label="Empresa" />
      <RHFTextField<PersonalSeguridadSchema> name="legajo" label="Legajo" />
    </Stack>
  );
}
