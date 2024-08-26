import { Stack, Divider, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../../types/planillaSchema";
import { SeguridadComponent } from "./components/seguridadComponent";

export function DatosSeguridad() {
  const { setValue } = useFormContext<PlanillaSchema>();
  const handlePersonalSelected = (
    lastname: string,
    firstname: string,
    dni: number,
    legajo: number,
    empresa: string
  ) => {
    setValue("datosSeguridad.0.apellidoSeguridad", lastname),
      setValue("datosSeguridad.0.nombreSeguridad", firstname),
      setValue("datosSeguridad.0.dniSeguridad", dni),
      setValue("datosSeguridad.0.legajoSeguridad", legajo);
    setValue("datosSeguridad.0.empresaSeguridad", empresa);
  };

  return (
    <Stack
      justifyContent="center"
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Datos Seguridad
      </Typography>
      <SeguridadComponent onPersonalSelected={handlePersonalSelected} />
    </Stack>
  );
}
