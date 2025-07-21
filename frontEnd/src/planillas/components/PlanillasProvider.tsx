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
import WarehouseControlFormMUI from "./planillaPrint/PlanillaPrintVersionV0deb";
//import WarehouseControlFormMUI from "./planillaPrint/PlanillaPrintVersionClaude";

interface PlanillasProviderProps {
  onBackHome: (data: boolean) => void;
}

export function PlanillasProvider({ onBackHome }: PlanillasProviderProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [showReview, setShowReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createPlanilla = useCreatePlanilla();
  const [printForm, setPrintForm] = useState(false);

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
    setIsSubmitting(true);
    setErrorMessage(null);
    const validationResult = planillaSchema.safeParse(data);
    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error);
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
      await createPlanilla.mutateAsync(data);
      console.log("✅ Form submitted successfully!");
      setShowReview(false);
      setIsSubmitting(false);
      setPrintForm(true);
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
      console.log("✅ Form is ready for review");
      setShowReview(true);
    } else {
      console.log("❌ Form has validation errors:");
      console.log("Validation errors:", validationResult.error.errors);

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

    console.log("Final data with horaFin:", finalData);

    // Submit the form
    await onSubmit(finalData);
  };

  const handleBackFromReview = () => {
    setShowReview(false);
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  const handleBackFromPrint = () => {
    setPrintForm(false);
    setErrorMessage(null);
    setIsSubmitting(false);
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

  if (printForm) {
    return (
      <FormProvider {...methods}>
        <CssBaseline />
        <Box sx={{ py: 3, px: 2 }}>
          <WarehouseControlFormMUI
            planillaDataId={"planillaId"}
            onBack={handleBackFromPrint}
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
