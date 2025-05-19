import { useState } from "react";
import { Path, useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../types/planillaSchema";

// Map step numbers to detailed fields paths
const detailedStepFields = {
  0: [
    "datosPsa.fecha",
    "datosPsa.responsable",
    "datosPsa.horaIni",
    "datosPsa.cant",
    "datosPsa.tipoControl",
    "datosPsa.medioTec",
    "datosPsa.tipoPro",
  ],
  1: [
    "datosVuelo.tipoVuelo",
    "datosVuelo.empresa",
    "datosVuelo.codVuelo",
    "datosVuelo.horaArribo",
    "datosVuelo.horaPartida",
    "datosVuelo.demora",
    "datosVuelo.matriculaAeronave",
    "datosVuelo.posicion",
  ],
  2: [
    "datosTerrestre.personalEmpresa",
    "datosTerrestre.funcion",
    "datosTerrestre.grupo",
  ],
  3: ["datosSeguridad.personalSegEmpresa", "datosSeguridad.empresaSeguridad"],
  4: [
    "datosVehiculos.vehiculo",
    "datosVehiculos.operadorVehiculo",
    "datosVehiculos.observacionesVehiculo",
    "novEquipajes",
    "novInspeccion",
    "novOtras",
  ],
};
const fieldNames: Record<string, string> = {
  "datosPsa.fecha": "Fecha",
  "datosPsa.responsable": "Responsable",
  "datosPsa.horaIni": "Hora de inicio",
  "datosPsa.cant": "Cantidad",
  "datosPsa.tipoControl": "Tipo de control",
  "datosPsa.medioTec": "Medio técnico",
  "datosPsa.tipoPro": "Tipo de procedimiento",
  "datosVuelo.tipoVuelo": "Tipo de vuelo",
  "datosVuelo.empresa": "Empresa",
  "datosVuelo.codVuelo": "Código de vuelo",
  "datosVuelo.horaArribo": "Hora de arribo",
  "datosVuelo.horaPartida": "Hora de partida",
  "datosVuelo.demora": "Demora",
  "datosVuelo.matriculaAeronave": "Matrícula de aeronave",
  "datosVuelo.posicion": "Posición",
  "datosTerrestre.personalEmpresa": "Personal de empresa",
  "datosTerrestre.funcion": "Función",
  "datosTerrestre.grupo": "Grupo",
  "datosSeguridad.personalSegEmpresa": "Personal de seguridad",
  "datosSeguridad.empresaSeguridad": "Empresa de seguridad",
  "datosVehiculos.vehiculo": "Vehículo",
  "datosVehiculos.operadorVehiculo": "Operador del vehículo",
  "datosVehiculos.observacionesVehiculo": "Observaciones del vehículo",
  novEquipajes: "Novedades de equipajes",
  novInspeccion: "Novedades de inspección",
  novOtras: "Otras novedades",
};

interface ValidationHookResult {
  validateCurrentStep: () => Promise<boolean>;
  errorMessage: string | null;
  clearErrorMessage: () => void;
}

type FieldPath = Path<PlanillaSchema>;

export function useStepValidation(activeStep: number): ValidationHookResult {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { trigger, formState } = useFormContext<PlanillaSchema>();

  const getNestedErrorMessage = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any,
    path: string[]
  ): string | undefined => {
    if (!obj || path.length === 0) return undefined;

    const [first, ...rest] = path;
    if (rest.length === 0) {
      if (
        obj[first] &&
        typeof obj[first] === "object" &&
        "message" in obj[first]
      ) {
        return obj[first].message;
      }
      return undefined;
    }
    if (obj[first] && typeof obj[first] === "object") {
      return getNestedErrorMessage(obj[first], rest);
    }
    return undefined;
  };

  const getFieldName = (field: string): string => {
    return fieldNames[field] || field.split(".").pop() || field;
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate =
      detailedStepFields[activeStep as keyof typeof detailedStepFields] || [];

    // First trigger validation for all fields in this step
    const results = await Promise.all(
      fieldsToValidate.map(async (field) => {
        const isValid = await trigger(field as FieldPath, {
          shouldFocus: false,
        });
        return { field, isValid };
      })
    );

    // Check if any fields are invalid
    const invalidFields = results.filter((result) => !result.isValid);

    if (invalidFields.length > 0) {
      // Collect specific error messages for each invalid field
      const errorMessages: string[] = [];

      invalidFields.forEach(({ field }) => {
        const pathParts = field.split(".");
        const friendlyName = getFieldName(field);
        // Get the error message from formState.errors
        let errorMsg: string | undefined;

        if (pathParts.length > 1) {
          // Handle nested fields
          errorMsg = getNestedErrorMessage(formState.errors, pathParts);
        } else {
          // Handle top-level fields
          const fieldError =
            formState.errors[field as keyof typeof formState.errors];
          if (
            fieldError &&
            typeof fieldError === "object" &&
            "message" in fieldError
          ) {
            errorMsg = fieldError.message as string;
          }
        }

        if (errorMsg) {
          errorMessages.push(`${friendlyName} - ${errorMsg}`);
        }
      });

      // Focus on the first invalid field
      if (invalidFields.length > 0) {
        trigger(invalidFields[0].field as FieldPath, { shouldFocus: true });
      }

      // Set the error message
      if (errorMessages.length === 1) {
        // For a single error, just show that error
        setErrorMessage(`Campo requerido: ${errorMessages[0]}`);
        console.log(`Campo requerido: ${errorMessages[0]}`);
      } else if (errorMessages.length <= 3) {
        // For 2-3 errors, list them with bullet points
        setErrorMessage(
          `Por favor complete los siguientes campos:\n• ${errorMessages.join(
            "\n• "
          )}`
        );
        console.log(
          `Por favor complete los siguientes campos:\n• ${errorMessages.join(
            "\n• "
          )}`
        );
      } else {
        // For many errors, show a count and the first few
        setErrorMessage(
          `Se requiere completar ${
            errorMessages.length
          } campos:\n• ${errorMessages.slice(0, 3).join("\n• ")}\n• ...`
        );
      }
      console.log(
        `Se requiere completar ${
          errorMessages.length
        } campos:\n• ${errorMessages.slice(0, 3).join("\n• ")}\n• ...`
      );

      return false;
    }

    return true;
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  return { validateCurrentStep, errorMessage, clearErrorMessage };
}
