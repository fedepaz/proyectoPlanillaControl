import { Stack, TextField } from "@mui/material";
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

export function Planillas() {
  const tipoControlQuery = useTipoControl();
  const medioTecQuery = useMediosTec();
  const tipoProQuery = useTipoPro();
  const demoraQuery = useDemora();
  const tipoVueloQuery = useTipoVuelo();
  const funcionQuery = useFuncion();

  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <Stack sx={{ gap: 2 }}>
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
    </Stack>
  );
}
