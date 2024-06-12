import { Divider, Stack, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import {
  useDemora,
  useFuncion,
  useMediosTec,
  useTipoControl,
  useTipoPro,
  useTipoVuelo,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckBox } from "../../components/RHFCheckBox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker";
import { RHFSlider } from "../../components/RHFSlider";

export function Planillas() {
  const tipoControlQuery = useTipoControl();
  const funcionQuery = useFuncion();
  const demoraQuery = useDemora();
  const medioTecQuery = useMediosTec();
  const tipoProQuery = useTipoPro();
  const tipoVueloQuery = useTipoVuelo();

  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <Stack
      justifyContent="flex-start"
      sx={{ gap: 2 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <TextField
        {...register("name")}
        label="Nombre"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name="tipoControl"
        options={tipoControlQuery.data}
        label="Tipo de Controles"
      />
      <RHFToggleButtonGroup<Schema>
        name="funcion"
        options={funcionQuery.data}
      ></RHFToggleButtonGroup>
      <RHFRadioGroup<Schema>
        name="demora"
        options={demoraQuery.data}
        label="Demora"
      ></RHFRadioGroup>
      <RHFCheckBox<Schema>
        name="mediosTec"
        options={medioTecQuery.data}
        label="Medios Técnicos"
      ></RHFCheckBox>
      <RHFDateTimePicker<Schema>
        name="registrationDateAndTime"
        label="Comienzo Vuelo"
      />
      <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />
      <RHFSlider<Schema> name="salartRange" label="Rango Salarial" />
    </Stack>
  );
}
