import { Divider, Stack } from "@mui/material";
import { NovedadesComponent } from "../../../components/NovedadesComponent";

import { useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../../types/planillaSchema";

export function DatosNovedades() {
  const { setValue, watch } = useFormContext<PlanillaSchema>();

  // Watch the current values
  const novEquipajes = watch("novEquipajes") || {
    isRequired: false,
    observaciones: "",
  };
  const novInspeccion = watch("novInspeccion") || {
    isRequired: false,
    observaciones: "",
  };
  const novOtras = watch("novOtras") || {
    isRequired: false,
    observaciones: "",
  };

  // Handlers for novEquipajes
  const handleEquipajesRequiredChange = (isRequired: boolean) => {
    setValue("novEquipajes", {
      ...novEquipajes,
      isRequired,
    });
  };

  const handleEquipajesObservacionesChange = (observaciones: string) => {
    setValue("novEquipajes", {
      ...novEquipajes,
      observaciones,
    });
  };

  // Handlers for novInspeccion
  const handleInspeccionRequiredChange = (isRequired: boolean) => {
    setValue("novInspeccion", {
      ...novInspeccion,
      isRequired,
    });
  };

  const handleInspeccionObservacionesChange = (observaciones: string) => {
    setValue("novInspeccion", {
      ...novInspeccion,
      observaciones,
    });
  };

  // Handlers for novOtras
  const handleOtrasRequiredChange = (isRequired: boolean) => {
    setValue("novOtras", {
      ...novOtras,
      isRequired,
    });
  };

  const handleOtrasObservacionesChange = (observaciones: string) => {
    setValue("novOtras", {
      ...novOtras,
      observaciones,
    });
  };
  return (
    <Stack
      justifyContent="center"
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <NovedadesComponent
        isRequired={novEquipajes.isRequired}
        observaciones={novEquipajes.observaciones}
        onRequiredChange={handleEquipajesRequiredChange}
        onObservacionesChange={handleEquipajesObservacionesChange}
        switchLabel="Novedades en equipajes"
        textFieldLabel="Observaciones de equipajes"
        placeholder="Describa las novedades en equipajes..."
      />

      <NovedadesComponent
        isRequired={novInspeccion.isRequired}
        observaciones={novInspeccion.observaciones}
        onRequiredChange={handleInspeccionRequiredChange}
        onObservacionesChange={handleInspeccionObservacionesChange}
        switchLabel="Novedades en inspección"
        textFieldLabel="Observaciones de inspección"
        placeholder="Describa las novedades en inspección..."
      />

      <NovedadesComponent
        isRequired={novOtras.isRequired}
        observaciones={novOtras.observaciones}
        onRequiredChange={handleOtrasRequiredChange}
        onObservacionesChange={handleOtrasObservacionesChange}
        switchLabel="Otras novedades"
        textFieldLabel="Otras observaciones"
        placeholder="Describa otras novedades..."
      />
    </Stack>
  );
}
