import { Divider, Stack, Typography } from "@mui/material";
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
import Loading from "../../../components/Loading";
import { useEffect } from "react";

export function DatosPsa() {
  const {
    data: tipoControlQuery,
    isLoading: tipoControlQueryIsLoading,
    error: tipoControlQueryError,
  } = useTipoControl();
  const {
    data: medioTecQuery,
    isLoading: medioTecQueryIsLoading,
    error: medioTecQueryError,
  } = useMediosTec();
  const {
    data: tipoProQuery,
    isLoading: tipoProQueryIsLoading,
    error: tipoProQueryError,
  } = useTipoPro();

  useEffect(() => {
    if (tipoControlQueryError) {
      console.log(tipoControlQueryError);
    }
    if (medioTecQueryError) {
      console.log(medioTecQueryError);
    }
    if (tipoProQueryError) {
      console.log(tipoProQueryError);
    }
  }, [tipoControlQueryError, medioTecQueryError, tipoProQueryError]);

  if (
    tipoControlQueryIsLoading ||
    medioTecQueryIsLoading ||
    tipoProQueryIsLoading
  ) {
    return <Loading />;
  }
  //const { setValue } = useFormContext<PlanillaSchema>();

  return (
    <Stack
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Datos Psa
      </Typography>
      <OficialComponent />
      <RHFDateTimePicker<PlanillaSchema>
        name="datosPsa.horaIni"
        label="Comienzo"
      />
      <RHFDateTimePicker<PlanillaSchema>
        name="datosPsa.horaFin"
        label="Finalizacion"
      />
      <RHFTextField<PlanillaSchema> name="datosPsa.cant" label="Cantidad" />
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
