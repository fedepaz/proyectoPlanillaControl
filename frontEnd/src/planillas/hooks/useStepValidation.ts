import { useState, useCallback, useEffect } from "react";
import { Path, useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../types/planillaSchema";

const detailedStepFields = {
  0: [
    // Datos de PSA
    "datosPsa.fecha",
    "datosPsa.responsable",
    "datosPsa.horaIni",
    "datosPsa.cant",
    "datosPsa.tipoControl",
    "datosPsa.medioTec",
    "datosPsa.tipoPro",
  ],
  1: [
    // Datos de vuelo
    "datosVuelo.empresa",
    "datosVuelo.tipoVuelo",
    "datosVuelo.codVuelo",
    "datosVuelo.demora",
    "datosVuelo.matriculaAeronave",
    "datosVuelo.posicion",
    // Note: horaArribo and horaPartida are handled by custom validation in schema
  ],
  2: [
    // Datos de terrestre
    "datosTerrestre.personalEmpresa",
    "datosTerrestre.funcion",
    "datosTerrestre.grupo",
  ],
  3: [
    // Datos de seguridad
    "datosSeguridad.personalSegEmpresa",
    "datosSeguridad.empresaSeguridad",
  ],
  4: [
    // Datos de vehiculos
    "datosVehiculos.vehiculo",
    "datosVehiculos.operadorVehiculo",
    "datosVehiculos.observacionesVehiculo",
  ],
  5: [
    // Datos de novedades
    "novEquipajes",
    "novInspeccion",
    "novOtras",
  ],
};

const fieldNames: Record<string, string> = {
  "datosPsa.fecha": "Fecha",
  "datosPsa.responsable": "Responsable",
  "datosPsa.horaIni": "Hora de inicio",
  "datosPsa.horaFin": "Hora de fin",
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

export function useStepValidation(
  activeStep: number,
  externalSetErrorMessage?: (message: string | null) => void
): ValidationHookResult {
  const [internalErrorMessage, setInternalErrorMessage] = useState<
    string | null
  >(null);
  const { trigger, formState, getValues } = useFormContext<PlanillaSchema>();

  // This ensures we're properly syncing the error message with the parent component
  useEffect(() => {
    if (externalSetErrorMessage && internalErrorMessage !== null) {
      externalSetErrorMessage(internalErrorMessage);
    }
  }, [internalErrorMessage, externalSetErrorMessage]);

  const getNestedErrorMessage = useCallback(
    (
      obj: any, // eslint-disable-line @typescript-eslint/no-explicit-any
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
    },
    []
  );

  const getFieldName = useCallback((field: string): string => {
    return fieldNames[field] || field.split(".").pop() || field;
  }, []);

  const validateArrayFields = useCallback(
    (stepNumber: number, formValues: PlanillaSchema): string[] => {
      const errors: string[] = [];

      // Special validation for array fields that need at least one entry
      if (stepNumber === 2) {
        // Datos terrestre - check if array has at least one complete entry
        if (
          !formValues.datosTerrestre ||
          formValues.datosTerrestre.length === 0
        ) {
          errors.push("Datos de terrestre - Se requiere al menos una entrada");
        } else {
          // Check if any entry is incomplete
          const incompleteEntries = formValues.datosTerrestre.filter(
            (entry) => !entry.personalEmpresa || !entry.funcion || !entry.grupo
          );
          if (incompleteEntries.length > 0) {
            errors.push("Datos de terrestre - Todos los campos son requeridos");
          }
        }
      }

      if (stepNumber === 3) {
        // Datos seguridad - check if array has at least one complete entry
        if (
          !formValues.datosSeguridad ||
          formValues.datosSeguridad.length === 0
        ) {
          errors.push("Datos de seguridad - Se requiere al menos una entrada");
        } else {
          // Check if any entry is incomplete
          const incompleteEntries = formValues.datosSeguridad.filter(
            (entry) =>
              !entry.personalSegEmpresa ||
              entry.personalSegEmpresa.length === 0 ||
              !entry.empresaSeguridad
          );
          if (incompleteEntries.length > 0) {
            errors.push("Datos de seguridad - Todos los campos son requeridos");
          }
        }
      }

      if (stepNumber === 4) {
        // Datos vehiculos - check if array has at least one complete entry
        if (
          !formValues.datosVehiculos ||
          formValues.datosVehiculos.length === 0
        ) {
          errors.push("Datos de vehículos - Se requiere al menos una entrada");
        } else {
          // Check if any entry is incomplete
          const incompleteEntries = formValues.datosVehiculos.filter(
            (entry) => !entry.vehiculo || !entry.operadorVehiculo
          );
          if (incompleteEntries.length > 0) {
            errors.push(
              "Datos de vehículos - Vehículo y operador son requeridos"
            );
          }
        }
      }

      return errors;
    },
    []
  );

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const fieldsToValidate =
      detailedStepFields[activeStep as keyof typeof detailedStepFields] || [];

    const formValues = getValues();

    // Check for array validation errors first
    const arrayErrors = validateArrayFields(activeStep, formValues);

    if (arrayErrors.length > 0) {
      const messageToSet =
        arrayErrors.length === 1
          ? arrayErrors[0]
          : `Se requieren completar los siguientes campos:\n• ${arrayErrors.join(
              "\n• "
            )}`;

      setInternalErrorMessage(messageToSet);
      if (externalSetErrorMessage) {
        externalSetErrorMessage(messageToSet);
      }
      return false;
    }

    // For step 5 (novedades), we don't need to validate individual fields
    // since they're all optional
    if (activeStep === 5) {
      setInternalErrorMessage(null);
      if (externalSetErrorMessage) {
        externalSetErrorMessage(null);
      }
      return true;
    }

    // Skip array field validation for steps 2, 3, 4 since we handled them above
    const fieldsToTrigger = fieldsToValidate.filter((field) => {
      if (activeStep === 2 && field.startsWith("datosTerrestre.")) return false;
      if (activeStep === 3 && field.startsWith("datosSeguridad.")) return false;
      if (activeStep === 4 && field.startsWith("datosVehiculos.")) return false;
      return true;
    });

    if (fieldsToTrigger.length === 0) {
      setInternalErrorMessage(null);
      if (externalSetErrorMessage) {
        externalSetErrorMessage(null);
      }
      return true;
    }

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
        } else {
          // If we don't have a specific message, add a generic one
          errorMessages.push(`${friendlyName} - Campo requerido`);
        }
      });

      // Focus on the first invalid field
      if (invalidFields.length > 0) {
        trigger(invalidFields[0].field as FieldPath, { shouldFocus: true });
      }

      // Set the error message
      let messageToSet: string;
      if (errorMessages.length === 1) {
        // For a single error, just show that error
        messageToSet = `Campo requerido: ${errorMessages[0]}`;
      } else if (errorMessages.length <= 3) {
        // For 2-3 errors, list them with bullet points
        messageToSet = `Por favor complete los siguientes campos:\n• ${errorMessages.join(
          "\n• "
        )}`;
      } else {
        // For many errors, show a count and the first few
        messageToSet = `Se requiere completar ${
          errorMessages.length
        } campos:\n• ${errorMessages.slice(0, 3).join("\n• ")}\n• ...`;
      }

      // Set internal state and external state if callback provided
      setInternalErrorMessage(messageToSet);
      if (externalSetErrorMessage) {
        externalSetErrorMessage(messageToSet);
      }

      console.log("Validation failed with message:", messageToSet);
      return false;
    }

    // Clear error messages on successful validation
    setInternalErrorMessage(null);
    if (externalSetErrorMessage) {
      externalSetErrorMessage(null);
    }

    return true;
  }, [
    activeStep,
    externalSetErrorMessage,
    trigger,
    formState,
    getNestedErrorMessage,
    getFieldName,
    getValues,
    validateArrayFields,
  ]);

  const clearErrorMessage = useCallback(() => {
    setInternalErrorMessage(null);
    if (externalSetErrorMessage) {
      externalSetErrorMessage(null);
    }
  }, [externalSetErrorMessage]);

  return {
    validateCurrentStep,
    errorMessage: internalErrorMessage,
    clearErrorMessage,
  };
}
