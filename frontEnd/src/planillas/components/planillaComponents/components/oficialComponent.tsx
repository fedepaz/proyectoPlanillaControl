import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OficialSchema,
  oficialSchema,
  defaultValuesOficial,
} from "../../../types/apiSchema";
import CardComponent from "../../../../components/CardComponent";
import { useSession } from "../../../../services/session";
import { useEffect } from "react";

export function OficialComponent() {
  const methods = useForm<OficialSchema>({
    resolver: zodResolver(oficialSchema),
    defaultValues: defaultValuesOficial,
    mode: "onChange",
  });

  const { data } = useSession();
  const oficialObject = {
    dni: methods.watch("dni"),
    firstname: methods.watch("firstname"),
    lastname: methods.watch("lastname"),
    legajo: methods.watch("legajo"),
  };

  useEffect(() => {
    if (data) {
      methods.setValue("dni", data.user.dni);
      methods.setValue("firstname", data.user.oficialId.firstname);
      methods.setValue("lastname", data.user.oficialId.lastname);
      methods.setValue("legajo", data.user.oficialId.legajo);
      if (data.user.oficialId.id)
        methods.setValue("id", data.user.oficialId.id);
    }
  }, [methods, data]);
  return (
    <div>
      <FormProvider {...methods}>
        <CardComponent oficialObject={oficialObject} />
      </FormProvider>
    </div>
  );
}
