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
import { FormReview } from "./planillaShow/formReview";
import { useCreatePlanilla } from "../services/planillas";
import { AxiosError } from "axios";
import { PlanillaDetailById } from "./planillaComponents/components/planillaDetailById";

interface PlanillasProviderProps {
  onBackHome: (data: boolean) => void;
}

export function PlanillasProvider({ onBackHome }: PlanillasProviderProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdPlanillaId, setCreatedPlanillaId] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPlanilla = useCreatePlanilla();

  const methods = useForm<PlanillaSchema>({
    mode: "onChange",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });
  const { setValue, handleSubmit, getValues, reset } = methods;

  const { user, userInfo, error, isError, isLoading, refetch } = useAuth();

  useEffect(() => {
    if (userInfo.authenticated && userInfo.user.oficialId.id) {
      setValue("datosPsa.responsable", userInfo.user.oficialId.id);
    }
  }, [userInfo, setValue]);

  const onSubmit = async (data: PlanillaSchema) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const validationResult = planillaSchema.safeParse(data);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors
        .map((error) => {
          const fieldPath = error.path.join(" -> ");
          return `${fieldPath}: ${error.message}`;
        })
        .join("\n");
      setErrorMessage(`Solucione los siguientes errores:\n${errorMessages}`);
      setIsSubmitting(false);
      return;
    }
    try {
      const result = await createPlanilla.mutateAsync(data);
      reset(defaultValuesPlanilla);

      setCreatedPlanillaId(result.id || null);
      setShowReview(false);
      setShowSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      }
    }
  };

  const handleFinalize = async () => {
    console.log("=== SHOWING REVIEW ===");
    // Get current form values
    const currentValues = getValues();
    console.log("Current form values:", currentValues);
    // Validate everything except horaFin (which will be set in review)
    const tempData = { ...currentValues };
    tempData.datosPsa.horaFin = "2359"; // Temporary value for validation

    const validationResult = planillaSchema.safeParse(tempData);

    if (validationResult.success) {
      setShowReview(true);
    } else {
      // Filter out horaFin errors for display
      const nonHoraFinErrors = validationResult.error.errors.filter(
        (err) => !err.path.includes("horaFin")
      );

      if (nonHoraFinErrors.length > 0) {
        const errorMessages = nonHoraFinErrors
          .map((err) => {
            const fieldPath = err.path.join(".");
            return `${fieldPath}: ${err.message}`;
          })
          .join("\n");

        setErrorMessage(`Hay errores en el formulario:\n${errorMessages}`);
      } else {
        // Only horaFin errors, proceed to review
        setShowReview(true);
        setErrorMessage(null);
      }
    }
  };
  // Handle final confirmation from review component
  const handleReviewConfirm = async (finalHoraFin: string) => {
    const currentValues = getValues();

    // Set the final horaFin value
    setValue("datosPsa.horaFin", finalHoraFin);

    // Create the final data object
    const finalData = {
      ...currentValues,
      datosPsa: {
        ...currentValues.datosPsa,
        horaFin: finalHoraFin,
      },
    };

    // Submit the form
    await onSubmit(finalData);
  };

  const handleBackFromReview = () => {
    setShowReview(false);
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  const handleBackFromSuccess = () => {
    setShowSuccess(false);
    setCreatedPlanillaId(null);
    setActiveStep(0);
    onBackHome(true);
  };

  const sendBack = (data: boolean) => {
    reset(defaultValuesPlanilla);
    setActiveStep(0);
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
  // Show success view with planilla details
  if (showSuccess && createdPlanillaId) {
    return (
      <>
        <CssBaseline />
        <PlanillaDetailById
          open={true}
          planillaId={createdPlanillaId}
          onClose={handleBackFromSuccess}
          isSuccessView={true}
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
      </>
    );
  }

  if (showReview) {
    return (
      <FormProvider {...methods}>
        <CssBaseline />
        <Box sx={{ py: 3, px: 2 }}>
          <FormReview
            formData={getValues()}
            onConfirm={handleReviewConfirm}
            onBack={handleBackFromReview}
            isSubmitting={isSubmitting}
          />
        </Box>
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
      </FormProvider>
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
