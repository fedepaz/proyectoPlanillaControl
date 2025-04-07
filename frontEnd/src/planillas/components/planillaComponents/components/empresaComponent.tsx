import { Stack } from "@mui/material";
import {
  defaultValuesEmpresa,
  EmpresaSchema,
  empresaSchema,
} from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useEmpresaTipoId, useTipoEmpresa } from "../../../services/queries";
import { RHFDropDownEmpresa } from "../../../../components/RHFDropDownEmpresa";
import { EmpresaOption } from "../../../../types/option";

interface EmpresaComponentProps {
  onEmpresaSelected: (tipoEmpresa: string) => void;
}

export function EmpresaComponent({ onEmpresaSelected }: EmpresaComponentProps) {
  const methods = useForm<EmpresaSchema>({
    resolver: zodResolver(empresaSchema),
    defaultValues: defaultValuesEmpresa,
    mode: "onChange",
  });
  const { watch } = methods;

  const tipoEmpresaWatch = watch("tipoEmpresa");
  const empresaWatch = watch("empresa");

  const tipoEmpresaQuery = useTipoEmpresa();
  const empresaQuery = useEmpresaTipoId(tipoEmpresaWatch || "");

  const tipoEmpresa = tipoEmpresaQuery.data;
  const empresa = empresaQuery.data;

  const tipoEmpresaOptions: EmpresaOption[] =
    tipoEmpresaQuery.data?.map((item) => ({
      id: item.id,
      empresa: item.label, // Using label as empresa for tipoEmpresa dropdown
    })) || [];

  // Transform empresa data to match EmpresaOption format
  const empresaOptions: EmpresaOption[] =
    empresaQuery.data?.map((item) => ({
      id: item.id,
      empresa: item.empresa,
    })) || [];

  useEffect(() => {
    console.log(tipoEmpresa);
    console.log(empresa);
    console.log(tipoEmpresaWatch);
    console.log(empresaWatch);
  }, [tipoEmpresa, empresa, empresaWatch, tipoEmpresaWatch]);

  useEffect(() => {
    if (tipoEmpresaWatch) {
      onEmpresaSelected(tipoEmpresaWatch);
    }
  }, [tipoEmpresaWatch, onEmpresaSelected]);

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <RHFDropDownEmpresa<EmpresaSchema>
          name="tipoEmpresa"
          options={tipoEmpresaOptions}
          label="Tipo de Empresa"
        />
        {tipoEmpresaWatch && (
          <RHFDropDownEmpresa<EmpresaSchema>
            name="empresa"
            options={empresaOptions}
            label="Empresa"
          />
        )}
      </Stack>
    </FormProvider>
  );
}
