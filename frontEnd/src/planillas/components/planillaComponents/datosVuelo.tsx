import { Stack, Divider, Typography } from "@mui/material";
import { RHFDateTimePicker } from "../../../components/RHFDateTimePicker";
import { RHFTextField } from "../../../components/RHFTextField";
import {
  defaultValuesPlanilla,
  PlanillaSchema,
} from "../../types/planillaSchema";
import { RHFRadioGroup } from "../../../components/RHFRadioGroup";
import { useDemora, useTipoVuelo } from "../../services/queries";
import { FormProvider, useForm } from "react-hook-form";
import { EmpresaComponent } from "./components/empresaComponent";
import { MatriculaComponent } from "./components/matriculaComponent";
import { AeropuertoComponent } from "./components/aeropuertoComponent";
import { CodVueloComponent } from "./components/codVueloComponent";

export function DatosVuelo() {
  const demoraQuery = useDemora();
  const tipoVueloQuery = useTipoVuelo();
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
            Datos Vuelo
          </Typography>
          {/*aerolinea*/}
          <EmpresaComponent />
          {/*codVuelo*/}
          <CodVueloComponent />
          {/*origen*/}
          <AeropuertoComponent label="Origen" />
          {/*destino*/}
          <AeropuertoComponent label="Destino" />
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
          <MatriculaComponent />
          {/*posicion*/}
          <RHFTextField<PlanillaSchema>
            name="datosVuelo.posicion"
            label="Posición"
          />
        </Stack>
      </form>
    </FormProvider>
  );
}
