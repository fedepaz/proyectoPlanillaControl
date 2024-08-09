import { Stack } from "@mui/material";
import {
  defaultValuesMatricula,
  matriculaAeronaveSchema,
  MatriculaAeronaveSchema,
} from "../../../types/apiSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useMatricula, useMatriculaId } from "../../../services/queries";
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

  const { setValue, watch, trigger } = methods;
  const [isNewMatricula, setIsNewMatricula] = useState(false);
  const [matToCheck, setMatToCheck] = useState("");

  const matricula = watch("matriculaAeronave");
  const { data: matriculaAeronave, refetch } = useMatriculaId(matToCheck);

  const handleMatriculaBlur = () => {
    if (matricula && matricula !== matToCheck) {
      setMatToCheck(matricula);
    }
  };

  useEffect(() => {
    if (matToCheck) {
      refetch();
    }
  }, [matToCheck, refetch]);

  useEffect(() => {
    if (matriculaAeronave) {
      onMatriculaSelected(matriculaAeronave.matriculaAeronave);
      setValue("matriculaAeronave", matriculaAeronave.matriculaAeronave);
      setValue("empresa", matriculaAeronave.empresa);
      setIsNewMatricula(false);
      trigger();
    } else if (matToCheck) {
      setIsNewMatricula(true);
    }
  }, [
    matriculaAeronave,
    matToCheck,
    onMatriculaSelected,
    setValue,
    trigger,
    isNewMatricula,
  ]);

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <RHFDropDownMatricula<MatriculaAeronaveSchema>
          name="matriculaAeronave"
          options={matriculaQuery.data}
          label="Matrícula"
          onBlur={handleMatriculaBlur}
        />
      </Stack>
    </FormProvider>
  );
}
