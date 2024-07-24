import { FormLabel, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTextField } from "../../../../components/RHFTextField";
import {
  defaultValuesVehiculos,
  VehiculosSchema,
} from "../../../types/apiSchema";

export function VehiculoComponent() {
  const methods = useForm<VehiculosSchema>({
    defaultValues: defaultValuesVehiculos,
  });
  return (
    <FormProvider {...methods}>
      <form>
        <Stack sx={{ gap: 1 }}>
          <FormLabel>Vehículo</FormLabel>
          <RHFTextField<VehiculosSchema>
            name="tipoVehiculo"
            label="Tipo Vehículo"
          />
          <RHFTextField<VehiculosSchema> name="empresa" label="Empresa" />
          <RHFTextField<VehiculosSchema>
            name="numInterno"
            label="Num Interno"
          />
        </Stack>
      </form>
    </FormProvider>
  );
}
