import { Stack, Divider, Typography } from "@mui/material";
import { PlanillaSchema } from "../../types/planillaSchema";
import { PersonalComponent } from "./components/personalComponent";
import { useFormContext } from "react-hook-form";
import {
  BasePersonalOption,
  PersonalEmpresaOption,
} from "../../../types/option";
import { EmpresaComponent } from "./components/empresaComponent";
import { useState } from "react";
import { ConfirmedListComponent } from "../../../components/ConfirmedListComponent";
import { MobileFunctionSelector } from "../../../components/MobileFunctionSelector";

const handlingId = import.meta.env.VITE_HANDLING_ID;
interface PersonalWithFunction extends BasePersonalOption {
  assignedFunctionIds?: string[];
}

export function DatosTerrestre() {
  const [empresaIdRef, setEmpresaIdRef] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [confirmedPersonalList, setConfirmedPersonalList] = useState<
    BasePersonalOption[]
  >([]);
  const [currentPersonalList, setCurrentPersonalList] = useState<
    BasePersonalOption[]
  >([]);

  const [empresaColorRef, setEmpresaColorRef] = useState("");
  const [personalWithFunctionsRef, setPersonalWithFunctionsRef] = useState<
    PersonalWithFunction[]
  >([]);

  const { setValue, watch } = useFormContext<PlanillaSchema>();

  const handleEmpresaSelected = (empresaId: string) => {
    setEmpresaIdRef(empresaId);
  };

  const handleFunctionAssignment = (
    personalWithFunctions: PersonalWithFunction[]
  ) => {
    setPersonalWithFunctionsRef(personalWithFunctions);
    console.log("Assignments:", personalWithFunctionsRef);
  };

  const handleColorByTipoEmpresa = (color: string) => {
    setEmpresaColorRef(color);
  };

  const handlePersonalListChange = (personalList: PersonalEmpresaOption[]) => {
    setCurrentPersonalList(personalList);
  };

  const handlePersonalListConfirm = (personalList: PersonalEmpresaOption[]) => {
    setConfirmedPersonalList(personalList);
    setIsConfirmed(personalList.length > 0);
  };

  return (
    <Stack
      justifyContent="center"
      sx={{ gap: 2, py: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Datos Terrestre
      </Typography>

      {/* Show components only if not confirmed */}
      {!isConfirmed && (
        <>
          <EmpresaComponent
            onColorByTipoEmpresa={handleColorByTipoEmpresa}
            onEmpresaSelected={handleEmpresaSelected}
            tipoFijoID={handlingId}
            label="handling"
          />
          {empresaIdRef !== "" && (
            <PersonalComponent
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
      {isConfirmed &&
        (confirmedPersonalList.length > 0 ? (
          <MobileFunctionSelector
            personalList={confirmedPersonalList}
            onAssignmentChange={handleFunctionAssignment}
            title="Asignar Funciones"
            empresaColor="primary.main"
            maxSelectionsPerPerson={2}
          />
        ) : (
          <ConfirmedListComponent
            empresaColor={empresaColorRef}
            personalList={confirmedPersonalList}
            title="Personal Terrestre Confirmado"
          />
        ))}
    </Stack>
  );
}
