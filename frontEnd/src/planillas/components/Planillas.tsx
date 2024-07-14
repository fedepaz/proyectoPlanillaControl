import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { PlanillaSchema, defaultValuesPlanilla } from "../types/planillaSchema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import {
  useDemora,
  useFuncion,
  useMediosTec,
  useOfi,
  useOficial,
  useTipoControl,
  useTipoPro,
  useTipoVuelo,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckBox } from "../../components/RHFCheckBox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFTextField } from "../../components/RHFTextField";
import { useEffect } from "react";

export function Planillas() {
  const tipoControlQuery = useTipoControl();
  const funcionQuery = useFuncion();
  const demoraQuery = useDemora();
  const medioTecQuery = useMediosTec();
  const tipoProQuery = useTipoPro();
  const tipoVueloQuery = useTipoVuelo();
  const oficialQuery = useOficial();

  const { watch, reset, setValue } = useFormContext<PlanillaSchema>();

  const _id = useWatch({ name: "_id" });

  const ofiQuery = useOfi(_id);

  useEffect(() => {
    const sub = watch((value) => {
      value;
    });
    return () => sub.unsubscribe();
  }, [watch]);

  const handleOfiClick = (_id: string) => {
    setValue("datosPsa.responsable", _id);
  };

  useEffect(() => {
    if (ofiQuery.data) {
      reset(ofiQuery.data);
    }
  }, [reset, ofiQuery.data]);

  const handleReset = () => {
    reset(defaultValuesPlanilla);
  };

  return (
    <Container maxWidth="sm" component="form">
      <Stack sx={{ flexDirection: "row" }}>
        <Stack
          justifyContent="flex-start"
          sx={{ gap: 2, py: 3 }}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <RHFTextField<PlanillaSchema>
            name="datosPsa.responsable"
            label="Nombre"
          />
          <RHFTextField<PlanillaSchema>
            name="datosVuelo.aerolinea"
            label="E-Mail"
          />

          <RHFAutocomplete<PlanillaSchema>
            name="datosPsa.tipoControl"
            options={tipoControlQuery.data}
            label="Tipo de Controles"
          />
          <RHFToggleButtonGroup<PlanillaSchema>
            name="datosTerrestre"
            options={funcionQuery.data}
          ></RHFToggleButtonGroup>
          <RHFRadioGroup<PlanillaSchema>
            name="datosVuelo.demora"
            options={demoraQuery.data}
            label="Demora"
          ></RHFRadioGroup>
          <RHFCheckBox<PlanillaSchema>
            name="datosPsa.medioTec"
            options={medioTecQuery.data}
            label="Medios Técnicos"
          ></RHFCheckBox>
          <RHFDateTimePicker<PlanillaSchema>
            name="datosPsa.horaIni"
            label="Comienzo Vuelo"
          />
          <RHFCheckBox<PlanillaSchema>
            name="datosPsa.tipoPro"
            options={tipoProQuery.data}
            label="Tipo de Procedimientos"
          ></RHFCheckBox>
          <RHFRadioGroup<PlanillaSchema>
            name="datosVuelo.tipoVuelo"
            options={tipoVueloQuery.data}
            label="Tipo de Vuelo"
          ></RHFRadioGroup>

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit">New User</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
