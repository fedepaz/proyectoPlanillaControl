import { Stack, Divider, Typography } from "@mui/material";
import { PlanillaSchema } from "../../types/planillaSchema";
import { useFormContext } from "react-hook-form";
import { PersonalSeguridadComponent } from "./components/seguridadComponent";
import { EmpresaComponent } from "./components/empresaComponent";
import { useState } from "react";
import { PersonalSeguridadOption } from "../../../types/option";

const seguridadId = import.meta.env.VITE_SEGURIDAD_ID;

export function DatosSeguridad() {
  const [empresaIdRef, setEmpresaIdRef] = useState("");
  const { setValue } = useFormContext<PlanillaSchema>();

  const handleEmpresaSelected = (empresaId: string) => {
    setEmpresaIdRef(empresaId);
  };

  const handlePersonalListChange = (
    personalList: PersonalSeguridadOption[]
  ) => {
    const datosPersonalSeguridad = personalList.map((personal) => ({
      personalSegEmpresa: [personal.id],
      empresaSeguridad: personal.empresaId,
    }));

    setValue("datosSeguridad", datosPersonalSeguridad);
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
      <EmpresaComponent
        onEmpresaSelected={handleEmpresaSelected}
        tipoFijoID={seguridadId}
        label="Empresa"
      />
      {empresaIdRef !== "" && (
        <PersonalSeguridadComponent
          onPersonalListChange={handlePersonalListChange}
          empresaId={empresaIdRef}
          maxPersonalList={10}
          minPersonalList={3}
        />
      )}
    </Stack>
  );
}
