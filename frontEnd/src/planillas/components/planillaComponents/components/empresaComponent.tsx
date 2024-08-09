import { Stack } from "@mui/material";
import { RHFTextField } from "../../../../components/RHFTextField";
import { defaultValuesEmpresa, EmpresaSchema } from "../../../types/apiSchema";
import { useForm } from "react-hook-form";

export function EmpresaComponent() {
  const methods = useForm<EmpresaSchema>({
    defaultValues: defaultValuesEmpresa,
  });
  return (
    <Stack sx={{ gap: 1 }}>
      <RHFTextField<EmpresaSchema> name="empresa" label="Empresa" />
    </Stack>
  );
}
