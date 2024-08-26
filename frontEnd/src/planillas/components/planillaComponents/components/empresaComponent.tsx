import { Stack } from "@mui/material";
import {
  defaultValuesEmpresa,
  EmpresaSchema,
  empresaSchema,
} from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useEmpresa } from "../../../services/queries";
import { RHFDropDownEmpresa } from "../../../../components/RHFDropDownEmpresa";

interface EmpresaComponentProps {
  onEmpresaSelected: (empresa: string) => void;
}

export function AerolineaComponent({
  onEmpresaSelected,
}: EmpresaComponentProps) {
  const methods = useForm<EmpresaSchema>({
    resolver: zodResolver(empresaSchema),
    defaultValues: defaultValuesEmpresa,
    mode: "onChange",
  });

  const empresaQuery = useEmpresa("aerolinea");

  const { setValue, watch } = methods;

  const empresaWatch = watch("empresa");

  useEffect(() => {
    if (empresaWatch) {
      const selectedEmpresa = empresaQuery.data?.find(
        (e) => e.empresa === empresaWatch
      );
      if (selectedEmpresa) {
        onEmpresaSelected(selectedEmpresa.empresa);
        setValue("empresa", selectedEmpresa.empresa);
        setValue("tipoEmpresa", selectedEmpresa.tipoEmpresa);
      }
    }
  }, [empresaWatch, empresaQuery.data, onEmpresaSelected, setValue]);

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <RHFDropDownEmpresa<EmpresaSchema>
          name="empresa"
          options={empresaQuery.data}
          label="Empresa"
        />
      </Stack>
    </FormProvider>
  );
}
