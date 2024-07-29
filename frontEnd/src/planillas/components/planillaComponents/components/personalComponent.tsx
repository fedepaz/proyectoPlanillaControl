import { FormLabel, Stack } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { usePersonalEmpresa } from "../../../services/queries";
import {
  defaultValuesPersonalEmpresa,
  PersonalEmpresaSchema,
  personalEmpresaSchema,
} from "../../../types/apiSchema";
import { RHFTextField } from "../../../../components/RHFTextField";

interface PersonalComponentProps {
  onPersonalSelected: (
    lastname: string,
    firstname: string,
    dni: number,
    legajo: number
  ) => void;
}

export function PersonalComponent({
  onPersonalSelected,
}: PersonalComponentProps) {
  const methods = useForm<PersonalEmpresaSchema>({
    resolver: zodResolver(personalEmpresaSchema),
    defaultValues: defaultValuesPersonalEmpresa,
    mode: "onChange",
  });

  const { setValue, watch, trigger } = methods;
  const [isNewPersonal, setIsNewPersonal] = useState(false);
  const [dniToCheck, setDniToCheck] = useState<number>(0);

  const dni = watch("dni");
  const { data: personal, refetch } = usePersonalEmpresa(dniToCheck);

  const handleDniBlur = () => {
    if (dni && dni !== dniToCheck) {
      setDniToCheck(dni);
    }
  };
  useEffect(() => {
    if (dniToCheck) {
      refetch();
    }
  }, [dniToCheck, refetch]);

  useEffect(() => {
    if (personal) {
      onPersonalSelected(
        personal.lastname,
        personal.firstname,
        personal.dni,
        personal.legajo
      );
      setValue("firstname", personal.firstname);
      setValue("lastname", personal.lastname);
      setValue("empresa", personal.empresa);
      setValue("legajo", personal.legajo);
      setIsNewPersonal(false);
      trigger();
    } else if (dniToCheck) {
      setIsNewPersonal(true);
    }
  }, [
    personal,
    dniToCheck,
    onPersonalSelected,
    setValue,
    trigger,
    isNewPersonal,
  ]);

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 1 }}>
        <FormLabel>Personal Empresa</FormLabel>
        <RHFTextField<PersonalEmpresaSchema>
          name="dni"
          label="DNI"
          valueAsNumber
          onBlur={handleDniBlur}
        />
        <RHFTextField<PersonalEmpresaSchema>
          name="lastname"
          label="Apellido"
          disabled={!!personal}
        />
        <RHFTextField<PersonalEmpresaSchema>
          name="firstname"
          label="Nombre"
          disabled={!!personal}
        />
        <RHFTextField<PersonalEmpresaSchema>
          name="empresa"
          label="Empresa"
          disabled={!!personal}
        />
        <RHFTextField<PersonalEmpresaSchema>
          name="legajo"
          label="Legajo"
          valueAsNumber
          disabled={!!personal}
        />
      </Stack>
    </FormProvider>
  );
}
