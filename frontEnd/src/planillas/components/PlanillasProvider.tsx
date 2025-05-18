import { FormProvider, useForm } from "react-hook-form";
import { Planillas } from "./Planillas";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
  planillaSchema,
} from "../types/planillaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSession } from "../../services/session";
import { CssBaseline, Box, Snackbar, Alert } from "@mui/material";
import ErrorPage from "../../components/Error";
import Loading from "../../components/Loading";

interface PlanillasProviderProps {
  onBack: (data: boolean) => void;
}

export function PlanillasProvider({ onBack }: PlanillasProviderProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<PlanillaSchema>({
    mode: "onChange",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });
  const { setValue, handleSubmit } = methods;

  const { data, error, isError, isLoading, refetch } = useSession();

  useEffect(() => {
    if (data && !error) {
      setValue("datosPsa.responsable", data?.user.oficialId.id);
    }
  }, [data, setValue, error]);

  const onSubmit = async (data: PlanillaSchema) => {
    console.log("Form submitted with data:", data);
    try {
      const validationResult = planillaSchema.safeParse(data);

      console.log("Validation passed " + validationResult);
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  const sendBack = (data: boolean) => {
    onBack(data);
  };
  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, 4));
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
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </form>
    </FormProvider>
  );
}
