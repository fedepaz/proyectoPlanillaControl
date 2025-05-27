import { Stack, Divider } from "@mui/material";
import { RHFDateTimePicker } from "../../../components/RHFDateTimePicker";
import { RHFTextField } from "../../../components/RHFTextField";
import { PlanillaSchema } from "../../types/planillaSchema";
import { RHFRadioGroup } from "../../../components/RHFRadioGroup";
import { useDemora, useTipoVuelo } from "../../services/queries";
import { useFormContext } from "react-hook-form";
import { EmpresaComponent } from "./components/empresaComponent";
import { MatriculaComponent } from "./components/matriculaComponent";
import { AeropuertoComponent } from "./components/aeropuertoComponent";
import { CodVueloComponent } from "./components/codVueloComponent";
const airlineId = import.meta.env.VITE_AEROLINE_ID;

export function DatosVuelo() {
  const demoraQuery = useDemora();
  const tipoVueloQuery = useTipoVuelo();
  const { setValue } = useFormContext<PlanillaSchema>();

  const handleMatSelected = (matriculaAeronave: string) => {
    setValue("datosVuelo.matriculaAeronave", matriculaAeronave);
  };
  const sendEmpresa = (empresaId: string) => {
    setValue("datosVuelo.empresa", empresaId);
  };

  const sendTipoVuelo = (tipoVueloId: string) => {
    console.log("Tipo de vuelo selected:", tipoVueloId);
  };

  const sendAeropuerto = (aeropuertoId: string) => {
    console.log("Aeropuerto selected:", aeropuertoId);
  };

  return (
    <Stack
      justifyContent="center"
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      {/*aerolinea*/}
      <EmpresaComponent
        onEmpresaSelected={sendEmpresa}
        tipoFijoID={airlineId}
        label="aerolinea"
      />

      {/*tipoVuelo*/}

      <RHFRadioGroup<PlanillaSchema>
        name="datosVuelo.tipoVuelo"
        options={tipoVueloQuery.data}
        label="Tipo de Vuelo"
      />
      {/*destino | origen*/}
      <AeropuertoComponent
        label="Destino"
        onAeropuertoSelected={sendAeropuerto}
      />
      {/*codVuelo*/}
      <CodVueloComponent />
      {/*horaArribo*/}
      <RHFDateTimePicker<PlanillaSchema>
        name="datosVuelo.horaArribo"
        label="Arribo"
      />

      {/*demora*/}
      <RHFRadioGroup<PlanillaSchema>
        name="datosVuelo.demora"
        options={demoraQuery.data}
        label="Demora"
      ></RHFRadioGroup>
      {/*matriculaAeronave*/}
      <MatriculaComponent onMatriculaSelected={handleMatSelected} />
      {/*posicion*/}
      <RHFTextField<PlanillaSchema>
        name="datosVuelo.posicion"
        label="Posición"
      />
    </Stack>
  );
}
