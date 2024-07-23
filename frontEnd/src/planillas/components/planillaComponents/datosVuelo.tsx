import { Stack, Divider, Typography } from "@mui/material";
import { RHFDateTimePicker } from "../../../components/RHFDateTimePicker";
import { RHFTextField } from "../../../components/RHFTextField";
import { PlanillaSchema } from "../../types/planillaSchema";
import { RHFRadioGroup } from "../../../components/RHFRadioGroup";
import { useDemora, useTipoVuelo } from "../../services/queries";

export function DatosVuelo() {
  const demoraQuery = useDemora();
  const tipoVueloQuery = useTipoVuelo();

  return (
    <>
      <Stack
        justifyContent="center"
        sx={{ gap: 2, py: 3 }}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Datos Vuelo
        </Typography>
        {/*aerolinea*/}
        <RHFTextField<PlanillaSchema>
          name="datosVuelo.aerolinea"
          label="Aerolínea"
        />
        {/*codVuelo*/}
        <RHFTextField<PlanillaSchema>
          name="datosVuelo.codVuelo"
          label="Código Vuelo"
        />
        {/*origen*/}
        {/*destino*/}
        {/*horaArribo*/}
        <RHFDateTimePicker<PlanillaSchema>
          name="datosVuelo.horaArribo"
          label="Arribo"
        />
        {/*horaPartida*/}
        <RHFDateTimePicker<PlanillaSchema>
          name="datosVuelo.horaPartida"
          label="Partida"
        />
        {/*demora*/}
        <RHFRadioGroup<PlanillaSchema>
          name="datosVuelo.demora"
          options={demoraQuery.data}
          label="Demora"
        ></RHFRadioGroup>
        {/*tipoVuelo*/}
        <RHFRadioGroup<PlanillaSchema>
          name="datosVuelo.tipoVuelo"
          options={tipoVueloQuery.data}
          label="Tipo de Vuelo"
        ></RHFRadioGroup>
        {/*matriculaAeronave*/}
        <RHFTextField<PlanillaSchema>
          name="datosVuelo.matriculaAeronave"
          label="Matrícula"
        />
        {/*posicion*/}
        <RHFTextField<PlanillaSchema>
          name="datosVuelo.posicion"
          label="Posición"
        />
      </Stack>
    </>
  );
}
