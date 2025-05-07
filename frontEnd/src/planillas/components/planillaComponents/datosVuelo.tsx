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

export function DatosVuelo() {
  const demoraQuery = useDemora();
  const tipoVueloQuery = useTipoVuelo();
  const { setValue } = useFormContext<PlanillaSchema>();

  const handleMatSelected = (matriculaAeronave: string) => {
    setValue("datosVuelo.matriculaAeronave", matriculaAeronave);
  };
  const sendEmpresa = (empresa: string) => {
    console.log("recibida de aerolinea ");
    const tipoEmpresa = empresa;
    console.log(tipoEmpresa);
  };

  return (
    <Stack
      justifyContent="center"
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      {/*aeropuertoControl*/}
      <AeropuertoComponent label="Control" />
      {/*tipoVuelo*/}

      <RHFRadioGroup<PlanillaSchema>
        name="datosVuelo.tipoVuelo"
        options={tipoVueloQuery.data}
        label="Tipo de Vuelo"
      ></RHFRadioGroup>
      {/*destino | origen*/}
      <AeropuertoComponent label="Destino" />
      {/*aerolinea*/}
      <EmpresaComponent onEmpresaSelected={sendEmpresa} />
      {/*codVuelo*/}
      <CodVueloComponent />
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
