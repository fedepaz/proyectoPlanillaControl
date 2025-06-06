import { FormLabel, Stack } from "@mui/material";
//import {  useForm } from "react-hook-form";
import { RHFTextField } from "../../../../components/RHFTextField";
import { VehiculosSchema } from "../../../types/apiSchema";

export function VehiculoComponent() {
  return (
    <Stack sx={{ gap: 1 }}>
      <FormLabel>Vehículo</FormLabel>
      <RHFTextField<VehiculosSchema>
        name="tipoVehiculo"
        label="Tipo Vehículo"
      />
      <RHFTextField<VehiculosSchema> name="empresa" label="Empresa" />
      <RHFTextField<VehiculosSchema> name="numInterno" label="Num Interno" />
    </Stack>
  );
}
