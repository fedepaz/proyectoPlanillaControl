import { FormLabel, Stack } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { usePersonalEmpresaSeg } from "../../../services/queries";
import {
  defaultValuesPersonalSeguridad,
  PersonalSeguridadSchema,
  personalSeguridadSchema,
} from "../../../types/apiSchema";
import { RHFTextField } from "../../../../components/RHFTextField";

interface PersonalComponentProps {
  onPersonalSelected: (
    lastname: string,
    firstname: string,
    dni: number,
    legajo: number,
    empresa: string
  ) => void;
}

export function SeguridadComponent({
  onPersonalSelected,
}: PersonalComponentProps) {
  const methods = useForm<PersonalSeguridadSchema>({
    resolver: zodResolver(personalSeguridadSchema),
    defaultValues: defaultValuesPersonalSeguridad,
    mode: "onChange",
  });

  const { setValue, watch, trigger } = methods;
  const [isNewPersonal, setIsNewPersonal] = useState(false);
  const [dniToCheck, setDniToCheck] = useState<number>(0);

  const dni = watch("dni");
  const { data: personal, refetch } = usePersonalEmpresaSeg(dniToCheck);

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
        personal.legajo,
        personal.empresa
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
        <FormLabel>Personal Seguridad</FormLabel>
        <RHFTextField<PersonalSeguridadSchema>
          name="dni"
          label="DNI"
          valueAsNumber
          onBlur={handleDniBlur}
        />
        <RHFTextField<PersonalSeguridadSchema>
          name="firstname"
          label="Nombre"
          disabled={!!personal}
        />
        <RHFTextField<PersonalSeguridadSchema>
          name="lastname"
          label="Apellido"
          disabled={!!personal}
        />
        <RHFTextField<PersonalSeguridadSchema>
          name="empresa"
          label="Empresa"
          disabled={!!personal}
        />
        <RHFTextField<PersonalSeguridadSchema>
          name="legajo"
          label="Legajo"
          disabled={!!personal}
          valueAsNumber
        />
      </Stack>
    </FormProvider>
  );
}
