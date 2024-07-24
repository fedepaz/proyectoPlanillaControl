import { Divider, FormLabel, Stack, Typography } from "@mui/material";
import { RHFDateTimePicker } from "../../../components/RHFDateTimePicker";
import {
  defaultValuesPlanilla,
  PlanillaSchema,
} from "../../types/planillaSchema";
import { OficialComponent } from "./components/oficialComponent";
import { RHFTextField } from "../../../components/RHFTextField";
import { RHFToggleButtonGroup } from "../../../components/RHFToggleButtonGroup";
import {
  useMediosTec,
  useTipoControl,
  useTipoPro,
} from "../../services/queries";
import { RHFCheckBox } from "../../../components/RHFCheckBox";
import { FormProvider, useForm } from "react-hook-form";

export function DatosPsa() {
  const tipoControlQuery = useTipoControl();
  const medioTecQuery = useMediosTec();
  const tipoProQuery = useTipoPro();
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const date = "Fecha Control: " + day + " / " + month;
  const methods = useForm<PlanillaSchema>({
    defaultValues: defaultValuesPlanilla,
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Stack
          justifyContent="center"
          sx={{ gap: 2, py: 3 }}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Datos Psa
          </Typography>
          {/*fecha*/}
          <FormLabel> {date}</FormLabel>
          {/*responsable*/}
          <OficialComponent />
          {/*horaIni*/}
          <RHFDateTimePicker<PlanillaSchema>
            name="datosPsa.horaIni"
            label="Comienzo"
          />
          {/*horaFin*/}
          <RHFDateTimePicker<PlanillaSchema>
            name="datosPsa.horaFin"
            label="Finalizacion"
          />
          {/*cant*/}
          <RHFTextField<PlanillaSchema> name="datosPsa.cant" label="Cantidad" />
          {/*tipoControl*/}
          <RHFToggleButtonGroup<PlanillaSchema>
            name="datosPsa.tipoControl"
            options={tipoControlQuery.data}
            label="Tipo Control"
          />

          {/*medioTec*/}
          <RHFCheckBox<PlanillaSchema>
            name="datosPsa.medioTec"
            options={medioTecQuery.data}
            label="Medios Técnicos"
          ></RHFCheckBox>

          {/*tipoPro*/}
          <RHFCheckBox<PlanillaSchema>
            name="datosPsa.tipoPro"
            options={tipoProQuery.data}
            label="Tipo de Procedimientos"
          ></RHFCheckBox>
        </Stack>
      </form>
    </FormProvider>
  );
}
