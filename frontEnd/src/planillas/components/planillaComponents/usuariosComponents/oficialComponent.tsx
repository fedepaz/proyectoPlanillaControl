import { Stack } from "@mui/material";
import { RHFTextField } from "../../../../components/RHFTextField";
import { OficialSchema } from "../../../types/apiSchema";

export function OficialComponent() {
  return (
    <Stack sx={{ gap: 1 }}>
      <RHFTextField<OficialSchema> name="dni" label="DNI" />
      <RHFTextField<OficialSchema> name="firstname" label="Nombre" />
      <RHFTextField<OficialSchema> name="lastname" label="Apellido" />
      <RHFTextField<OficialSchema> name="legajo" label="Legajo" />
    </Stack>
  );
}
