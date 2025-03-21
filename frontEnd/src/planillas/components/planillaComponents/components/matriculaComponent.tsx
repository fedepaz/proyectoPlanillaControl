import { Stack } from "@mui/material";
import {
  defaultValuesMatricula,
  matriculaAeronaveSchema,
  MatriculaAeronaveSchema,
} from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useMatricula } from "../../../services/queries";
import { RHFDropDownMatricula } from "../../../../components/RHFDropDownMatricula";

interface MatriculaComponentProps {
  onMatriculaSelected: (matricula: string) => void;
}

export function MatriculaComponent({
  onMatriculaSelected,
}: MatriculaComponentProps) {
  const methods = useForm<MatriculaAeronaveSchema>({
    resolver: zodResolver(matriculaAeronaveSchema),
    defaultValues: defaultValuesMatricula,
    mode: "onChange",
  });
  const matriculaQuery = useMatricula();

  const { setValue, watch } = methods;

  const matriculaWatch = watch("matriculaAeronave");

  useEffect(() => {
    if (matriculaWatch) {
      const matriculaAeronave = matriculaQuery.data?.find(
        (m) => m.matriculaAeronave === matriculaWatch
      );
      if (matriculaAeronave) {
        onMatriculaSelected(matriculaAeronave.matriculaAeronave);
        setValue("matriculaAeronave", matriculaAeronave.matriculaAeronave);
        setValue("empresa", matriculaAeronave.empresa);
      }
    }
  }, [matriculaWatch, matriculaQuery.data, onMatriculaSelected, setValue]);

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <RHFDropDownMatricula<MatriculaAeronaveSchema>
          name="matriculaAeronave"
          options={matriculaQuery.data}
          label="Matrícula"
        />
      </Stack>
    </FormProvider>
  );
}
