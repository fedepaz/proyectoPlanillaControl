import { Stack, Divider } from "@mui/material";
import { RHFTextField } from "../../../components/RHFTextField";
import { PlanillaSchema } from "../../types/planillaSchema";
import { RHFRadioGroup } from "../../../components/RHFRadioGroup";
import { useDemora, useTipoVuelo } from "../../services/queries";
import { useFormContext } from "react-hook-form";
import { EmpresaComponent } from "./components/empresaComponent";
import { MatriculaComponent } from "./components/matriculaComponent";
import { AeropuertoComponent } from "./components/aeropuertoComponent";
import { CodVueloComponent } from "./components/codVueloComponent";
import { useEffect, useState } from "react";

import { RHFFlightTimePicker } from "../../../components/RHFFlightTimePicker";
import { useAuth } from "../../../hooks/useAuth";

const airlineId = import.meta.env.VITE_AEROLINE_ID;

export function DatosVuelo() {
  const demoraQuery = useDemora();
  const tipoVueloQuery = useTipoVuelo();
  const { userInfo } = useAuth();
  const [origenIdRef, setOrigenIdRef] = useState("");
  const [destinoIdRef, setDestinoIdRef] = useState("");
  const [empresaIdRef, setEmpresaIdRef] = useState("");
  const { setValue, watch } = useFormContext<PlanillaSchema>();

  const sendEmpresa = (empresaId: string) => {
    setValue("datosVuelo.empresa", empresaId);
    setEmpresaIdRef(empresaId);
  };
  let tipoVuelo: "arribo" | "partida" | "" = "";
  if (tipoVueloQuery.data) {
    const selectedVuelo = watch("datosVuelo.tipoVuelo");
    tipoVuelo =
      selectedVuelo === tipoVueloQuery.data[0].id ? "arribo" : "partida";
  }
  const sendAeropuerto = (aeropuertoId: string) => {
    if (tipoVuelo === "partida") {
      setValue("datosVuelo.horaArribo", "");
      setDestinoIdRef(aeropuertoId);
    } else {
      setValue("datosVuelo.horaPartida", "");
      setOrigenIdRef(aeropuertoId);
    }
  };

  useEffect(() => {
    if (userInfo?.user?.oficialId?.currentAirportId?.id && tipoVuelo) {
      const currentAirportId = userInfo.user.oficialId.currentAirportId.id;

      if (tipoVuelo === "partida") {
        setOrigenIdRef(currentAirportId);
      } else {
        setDestinoIdRef(currentAirportId);
      }
    }
  }, [userInfo, tipoVuelo]);

  const sendCodVuelo = (codVueloId: string) => {
    setValue("datosVuelo.codVuelo", codVueloId);
  };
  const sendMatricula = (matriculaAeronave: string) => {
    setValue("datosVuelo.matriculaAeronave", matriculaAeronave);
  };

  const canRenderCodVuelo = origenIdRef && destinoIdRef && empresaIdRef;
  const canRenderMatricula = empresaIdRef;
  const canRenderDateTimePicker = tipoVuelo === "partida";

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
        onColorByTipoEmpresa={() => {}}
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
      {canRenderCodVuelo && (
        <CodVueloComponent
          onCodVueloSelected={sendCodVuelo}
          origenId={origenIdRef}
          destinoId={destinoIdRef}
          empresaId={empresaIdRef}
        />
      )}
      {/*hora*/}
      {!canRenderDateTimePicker && (
        <RHFFlightTimePicker
          name="datosVuelo.horaArribo"
          flightType={tipoVuelo}
          label="Hora de Arribo"
        />
      )}
      {canRenderDateTimePicker && (
        <RHFFlightTimePicker
          name="datosVuelo.horaPartida"
          flightType={tipoVuelo}
          label="Hora de Partida"
        />
      )}

      {/*demora*/}
      <RHFRadioGroup<PlanillaSchema>
        name="datosVuelo.demora"
        options={demoraQuery.data}
        label="Demora"
      ></RHFRadioGroup>
      {/*matriculaAeronave*/}
      {canRenderMatricula && (
        <MatriculaComponent
          onMatriculaSelected={sendMatricula}
          empresaId={empresaIdRef}
        />
      )}
      {/*posicion*/}
      <RHFTextField<PlanillaSchema>
        name="datosVuelo.posicion"
        label="Posición"
      />
    </Stack>
  );
}
