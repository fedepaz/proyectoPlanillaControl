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
    const now = new Date();
    const currentHour = now.getHours();
    let controlDate: Date | null = null;
    if (startTime) {
      let selectedHour: number;
      if (startTime.includes("T")) {
        selectedHour = new Date(startTime).getHours();
      } else if (startTime.length === 4) {
        selectedHour = parseInt(startTime.substring(0, 2), 10);
      } else {
        selectedHour = currentHour;
      }

      if (
        currentHour >= 0 &&
        currentHour <= 1 &&
        selectedHour >= 22 &&
        selectedHour <= 23
      ) {
        // Control happened yesterday
        controlDate = new Date(now);
        controlDate.setDate(controlDate.getDate() - 1);
      } else {
        // Control happens today
        controlDate = now;
      }
    } else {
      // No start time selected, use current date
      controlDate = now;
    }

    const fechaControl = format(controlDate, "dd/MM/yyyy");
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
        helperText="Horario del comienzo del control. Admite hasta 2 horas previas a la hora actual."
      />
      <RHFTextField<PlanillaSchema>
        name="datosPsa.cant"
        label="Cantidad"
        type="number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 2 }}
        helperText="Cantidad de oficiales que realizaron el control."
      />
      <RHFToggleButtonGroup<PlanillaSchema>
        name="datosPsa.tipoControl"
        options={tipoControlQuery}
        label="Tipo Control"
        helperText="Tipo de control que se realizó en el área."
      />
      <RHFCheckBox<PlanillaSchema>
        name="datosPsa.medioTec"
        options={medioTecQuery}
        label="Medios Técnicos"
        helperText="Medios técnicos que se utilizaron en el control."
      />
      <RHFCheckBox<PlanillaSchema>
        name="datosPsa.tipoPro"
        options={tipoProQuery}
        label="Tipo de Procedimientos"
        helperText="Tipo de procedimientos que se realizaron en el control."
      />
    </Stack>
  );
}
