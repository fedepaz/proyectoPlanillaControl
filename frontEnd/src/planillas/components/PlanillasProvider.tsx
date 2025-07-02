import { FormProvider, useForm } from "react-hook-form";
import { Planillas } from "./Planillas";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
  planillaSchema,
} from "../types/planillaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { CssBaseline, Box, Snackbar, Alert } from "@mui/material";
import ErrorPage from "../../components/Error";
import Loading from "../../components/Loading";

import { useAuth } from "../../hooks/useAuth";

interface PlanillasProviderProps {
  onBackHome: (data: boolean) => void;
}

export function PlanillasProvider({ onBackHome }: PlanillasProviderProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<PlanillaSchema>({
    mode: "onChange",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });
  const { setValue, handleSubmit, getValues } = methods;

  const { user, userInfo, error, isError, isLoading, refetch } = useAuth();

  useEffect(() => {
    if (userInfo.authenticated && userInfo.user.oficialId.id) {
      setValue("datosPsa.responsable", userInfo.user.oficialId.id);
    }
  }, [userInfo, setValue]);

  const onSubmit = async (data: PlanillaSchema) => {
    console.log("Form submitted with data:", data);
    try {
      const validationResult = planillaSchema.safeParse(data);
      if (validationResult.success) {
        console.log("Validation passed", validationResult.data);
        // Here you can add your actual submission logic
      } else {
        console.error("Validation errors:", validationResult.error);
        setErrorMessage("Solucione los errores anteriores");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  // New function to handle finalization with debugging
  const handleFinalize = async () => {
    console.log("=== FINALIZING FORM ===");

    // Get current form values (even if invalid)
    const currentValues = getValues();
    console.log("Current form values:", currentValues);

    // Try to validate and submit
    try {
      const validationResult = planillaSchema.safeParse(currentValues);
      if (validationResult.success) {
        console.log("✅ Form is valid, submitting...");
        await onSubmit(validationResult.data);
      } else {
        console.log("❌ Form has validation errors:");
        console.log("Validation errors:", validationResult.error.errors);

        // Still log the data for debugging
        console.log("Raw form data (with errors):", currentValues);

        // Show error message
        setErrorMessage(
          "Hay errores en el formulario. Revise los datos ingresados."
        );
      }
    } catch (error) {
      console.error("Error during finalization:", error);
      console.log("Raw form data (error case):", currentValues);
    }
  };

  const sendBack = (data: boolean) => {
    onBackHome(data);
  };
  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, 5));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  if (isLoading) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minHeight: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Loading />
        </Box>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minHeight: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <ErrorPage
            error={error}
            onRetry={() => {
              refetch();
            }}
          />
        </Box>
      </>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Planillas
          activeStep={activeStep}
          setErrorMessage={setErrorMessage}
          clearErrorMessage={clearErrorMessage}
          onBack={sendBack}
          onNext={handleNext}
          onPrevious={handleBack}
          onFinalize={handleFinalize}
          user={user}
        />
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={clearErrorMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={clearErrorMessage}
            severity="error"
            sx={{ width: "100%", whiteSpace: "pre-line" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </form>
    </FormProvider>
  );
}
