import { Stack, Divider, Typography } from "@mui/material";
import { RHFDateTimePicker } from "../../../components/RHFDateTimePicker";
import { RHFTextField } from "../../../components/RHFTextField";
import {
  defaultValuesPlanilla,
  PlanillaSchema,
} from "../../types/planillaSchema";
import { RHFRadioGroup } from "../../../components/RHFRadioGroup";
import { useDemora, useTipoVuelo } from "../../services/queries";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { EmpresaComponent } from "./components/empresaComponent";
import { MatriculaComponent } from "./components/matriculaComponent";
import { AeropuertoComponent } from "./components/aeropuertoComponent";
import { CodVueloComponent } from "./components/codVueloComponent";

export function DatosVuelo() {
  const demoraQuery = useDemora();
  const tipoVueloQuery = useTipoVuelo();
  const { control, setValue } = useFormContext<PlanillaSchema>();

  const handleMatSelected = (matriculaAeronave: string) => {
    setValue("datosVuelo.matriculaAeronave", matriculaAeronave);
  };

  return (
    <Stack
      justifyContent="center"
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Datos Vuelo
      </Typography>
      {/*aerolinea*/}
      {/*codVuelo*/}
      <CodVueloComponent />
      {/*origen*/}
      <AeropuertoComponent label="Origen" />
      {/*destino*/}
      <AeropuertoComponent label="Destino" />
      {/*horaArribo*/}
      <RHFDateTimePicker<PlanillaSchema>
        control={control}
        name="datosVuelo.horaArribo"
        label="Arribo"
      />
      {/*horaPartida*/}
      <RHFDateTimePicker<PlanillaSchema>
        control={control}
        name="datosVuelo.horaPartida"
        label="Partida"
      />
      {/*demora*/}
      <RHFRadioGroup<PlanillaSchema>
        control={control}
        name="datosVuelo.demora"
        options={demoraQuery.data}
        label="Demora"
      ></RHFRadioGroup>
      {/*tipoVuelo*/}
      <RHFRadioGroup<PlanillaSchema>
        control={control}
        name="datosVuelo.tipoVuelo"
        options={tipoVueloQuery.data}
        label="Tipo de Vuelo"
      ></RHFRadioGroup>
      {/*matriculaAeronave*/}
      <MatriculaComponent onMatriculaSelected={handleMatSelected} />
      {/*posicion*/}
      <RHFTextField<PlanillaSchema>
        control={control}
        name="datosVuelo.posicion"
        label="Posición"
      />
      <EmpresaComponent />
    </Stack>
  );
}
