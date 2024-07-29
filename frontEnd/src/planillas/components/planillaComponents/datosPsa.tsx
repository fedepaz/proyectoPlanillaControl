import { Divider, FormLabel, Stack, Typography } from "@mui/material";
import { RHFDateTimePicker } from "../../../components/RHFDateTimePicker";
import { PlanillaSchema } from "../../types/planillaSchema";
import { OficialComponent } from "./components/oficialComponent";
import { RHFTextField } from "../../../components/RHFTextField";
import { RHFToggleButtonGroup } from "../../../components/RHFToggleButtonGroup";
import {
  useMediosTec,
  useTipoControl,
  useTipoPro,
} from "../../services/queries";
import { RHFCheckBox } from "../../../components/RHFCheckBox";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

interface DatosPsaProps {
  onDatosPsaSelected: (fecha: string) => void;
}

export function DatosPsa({ onDatosPsaSelected }: DatosPsaProps) {
  const tipoControlQuery = useTipoControl();
  const medioTecQuery = useMediosTec();
  const tipoProQuery = useTipoPro();
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const fechaActual = "Fecha Control: " + day + " / " + month;
  const { control, setValue } = useFormContext<PlanillaSchema>();
  const handleOficialSelected = (legajo: number) => {
    setValue("datosPsa.responsable", legajo);
  };

  useEffect(() => {
    onDatosPsaSelected(fechaActual);
  });

  return (
    <Stack
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Datos Psa
      </Typography>
      <FormLabel>{fechaActual}</FormLabel>
      <OficialComponent onOficialSelected={handleOficialSelected} />
      <RHFDateTimePicker<PlanillaSchema>
        control={control}
        name="datosPsa.horaIni"
        label="Comienzo"
      />
      <RHFDateTimePicker<PlanillaSchema>
        control={control}
        name="datosPsa.horaFin"
        label="Finalizacion"
      />
      <RHFTextField<PlanillaSchema>
        control={control}
        name="datosPsa.cant"
        label="Cantidad"
      />
      <RHFToggleButtonGroup<PlanillaSchema>
        control={control}
        name="datosPsa.tipoControl"
        options={tipoControlQuery.data}
        label="Tipo Control"
      />
      <RHFCheckBox<PlanillaSchema>
        control={control}
        name="datosPsa.medioTec"
        options={medioTecQuery.data}
        label="Medios Técnicos"
      />
      <RHFCheckBox<PlanillaSchema>
        control={control}
        name="datosPsa.tipoPro"
        options={tipoProQuery.data}
        label="Tipo de Procedimientos"
      />
    </Stack>
  );
}
