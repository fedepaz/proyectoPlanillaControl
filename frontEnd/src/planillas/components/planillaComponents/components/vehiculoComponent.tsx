import { FormLabel, Stack } from "@mui/material";
//import {  useForm } from "react-hook-form";
import { RHFTextField } from "../../../../components/RHFTextField";
import { VehiculosSchema } from "../../../types/apiSchema";
import { PlanillaSchema } from "../../../types/planillaSchema";
import { useFormContext } from "react-hook-form";

interface PersonalWithFunction {
  personalEmpresa: string;
  funcion: string;
  grupo: string;
}

export function VehiculoComponent() {
  const { watch } = useFormContext<PlanillaSchema>();
  const datosTerrestre = watch("datosTerrestre") as
    | PersonalWithFunction[]
    | undefined;
  console.log("datosTerrestre", datosTerrestre);
  return (
    <Stack sx={{ gap: 1 }}>
      <FormLabel>Vehículo</FormLabel>
      <RHFTextField<VehiculosSchema> name="empresa" label="Empresa" />
      <RHFTextField<VehiculosSchema>
        name="tipoVehiculo"
        label="Tipo Vehículo"
      />
      <RHFTextField<VehiculosSchema> name="numInterno" label="Num Interno" />
    </Stack>
  );
}
