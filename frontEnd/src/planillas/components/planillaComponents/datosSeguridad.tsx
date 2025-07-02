import { Stack, Divider, Typography } from "@mui/material";
import { PlanillaSchema } from "../../types/planillaSchema";
import { useFormContext } from "react-hook-form";
import { PersonalSeguridadComponent } from "./components/seguridadComponent";
import { EmpresaComponent } from "./components/empresaComponent";
import { useState } from "react";
import {
  BasePersonalOption,
  PersonalSeguridadOption,
} from "../../../types/option";
import { ConfirmedListComponent } from "../../../components/ConfirmedListComponent";

const seguridadId = import.meta.env.VITE_SEGURIDAD_ID;

export function DatosSeguridad() {
  const [empresaIdRef, setEmpresaIdRef] = useState("");
  const [empresaColorRef, setEmpresaColorRef] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [confirmedPersonalList, setConfirmedPersonalList] = useState<
    BasePersonalOption[]
  >([]);
  const [currentPersonalList, setCurrentPersonalList] = useState<
    BasePersonalOption[]
  >([]);
  const { setValue } = useFormContext<PlanillaSchema>();

  const handleEmpresaSelected = (empresaId: string) => {
    setEmpresaIdRef(empresaId);
  };

  const handleColorByTipoEmpresa = (color: string) => {
    setEmpresaColorRef(color);
  };

  const handlePersonalListChange = (
    personalList: PersonalSeguridadOption[]
  ) => {
    setCurrentPersonalList(personalList);
  };

  const handlePersonalListConfirm = (
    personalList: PersonalSeguridadOption[]
  ) => {
    setConfirmedPersonalList(personalList);
    if (personalList.length > 0) {
      setIsConfirmed(true);
      const datosSeguridadConfirm = [
        {
          personalSegEmpresa: personalList.map((p) => p.id),
          empresaSeguridad: empresaIdRef,
        },
      ];
      setValue("datosSeguridad", datosSeguridadConfirm);
    }
  };

  return (
    <Stack
      justifyContent="center"
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Datos Seguridad
      </Typography>
      {!isConfirmed && (
        <>
          <EmpresaComponent
            onEmpresaSelected={handleEmpresaSelected}
            onColorByTipoEmpresa={handleColorByTipoEmpresa}
            tipoFijoID={seguridadId}
            label="seguridad"
          />
          {empresaIdRef !== "" && (
            <PersonalSeguridadComponent
              empresaId={empresaIdRef}
              onPersonalListChange={handlePersonalListChange}
              onPersonalListConfirm={handlePersonalListConfirm}
              requireConfirmation={true}
              initialPersonalList={[]}
              minPersonalList={1}
            />
          )}
        </>
      )}

      {/* Show confirmed list once confirmed */}
      {isConfirmed && confirmedPersonalList.length > 0 && (
        <ConfirmedListComponent
          empresaColor={empresaColorRef}
          personalList={confirmedPersonalList}
          title="Personal Seguridad Confirmado"
        />
      )}
    </Stack>
  );
}
