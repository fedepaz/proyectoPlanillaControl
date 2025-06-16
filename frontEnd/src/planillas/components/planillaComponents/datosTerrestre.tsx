import { Stack, Divider, Typography } from "@mui/material";
import { PlanillaSchema } from "../../types/planillaSchema";
import { PersonalComponent } from "./components/personalComponent";
import { useFuncion } from "../../services/queries";
import { useFormContext } from "react-hook-form";
import { PersonalEmpresaOption } from "../../../types/option";
import { EmpresaComponent } from "./components/empresaComponent";
import { useState } from "react";

const handlingId = import.meta.env.VITE_HANDLING_ID;

export function DatosTerrestre() {
  const [empresaIdRef, setEmpresaIdRef] = useState("");

  const funcionQuery = useFuncion();
  const { setValue, watch } = useFormContext<PlanillaSchema>();

  const handleEmpresaSelected = (empresaId: string) => {
    setEmpresaIdRef(empresaId);
  };

  const handlePersonalListChange = (personalList: PersonalEmpresaOption[]) => {
    const datosPersonalTerrestre = personalList.map((personal) => ({
      personalEmpresa: [personal.id],
      funcion: "superior",
      grupo: "",
    }));
    setValue("datosTerrestre", datosPersonalTerrestre);
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
      <EmpresaComponent
        onEmpresaSelected={handleEmpresaSelected}
        tipoFijoID={handlingId}
        label="Empresa"
      />
      <PersonalComponent
        onPersonalListChange={handlePersonalListChange}
        empresaId={empresaIdRef}
        maxPersonalList={10}
        minPersonalList={3}
      />
    </Stack>
  );
}
