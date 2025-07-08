import { Divider, Stack } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

import { RHFDateTimePicker } from "../../../components/RHFDateTimePicker";
import { RHFTextField } from "../../../components/RHFTextField";
import { RHFToggleButtonGroup } from "../../../components/RHFToggleButtonGroup";
import { RHFCheckBox } from "../../../components/RHFCheckBox";
import Loading from "../../../components/Loading";

import { PlanillaSchema } from "../../types/planillaSchema";
import {
  useMediosTec,
  useTipoControl,
  useTipoPro,
} from "../../services/queries";
import { useEffect } from "react";
import { format } from "date-fns";

export function DatosPsa() {
  const { setValue, control } = useFormContext<PlanillaSchema>();
  const { data: tipoControlQuery, isLoading: tipoControlQueryIsLoading } =
    useTipoControl();
  const { data: medioTecQuery, isLoading: medioTecQueryIsLoading } =
    useMediosTec();
  const { data: tipoProQuery, isLoading: tipoProQueryIsLoading } = useTipoPro();

  const startTime = useWatch({
    control,
    name: "datosPsa.horaIni",
  });

  useEffect(() => {
    const fechaControl = startTime
      ? format(new Date(startTime), "dd/MM/yyyy")
      : format(new Date(), "dd/MM/yyyy");

    setValue("datosPsa.fecha", fechaControl);
  }, [setValue, startTime]);

  if (
    tipoControlQueryIsLoading ||
    medioTecQueryIsLoading ||
    tipoProQueryIsLoading
  ) {
    return <Loading />;
  }

  return (
    <Stack
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <RHFDateTimePicker<PlanillaSchema>
        name="datosPsa.horaIni"
        label="Hora de Inicio"
      />
      <RHFTextField<PlanillaSchema>
        name="datosPsa.cant"
        label="Cantidad"
        type="number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 2 }}
      />
      <RHFToggleButtonGroup<PlanillaSchema>
        name="datosPsa.tipoControl"
        options={tipoControlQuery}
        label="Tipo Control"
      />
      <RHFCheckBox<PlanillaSchema>
        name="datosPsa.medioTec"
        options={medioTecQuery}
        label="Medios Técnicos"
      />
      <RHFCheckBox<PlanillaSchema>
        name="datosPsa.tipoPro"
        options={tipoProQuery}
        label="Tipo de Procedimientos"
      />
    </Stack>
  );
}
