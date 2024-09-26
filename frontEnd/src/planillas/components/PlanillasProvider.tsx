import { FormProvider, useForm } from "react-hook-form";
import { Planillas } from "./Planillas";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
  planillaSchema,
} from "../types/planillaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Alert, AlertProps, Snackbar } from "@mui/material";

export function PlanillasProvider() {
  const methods = useForm<PlanillaSchema>({
    mode: "all",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });
  const { setValue, handleSubmit } = methods;

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertProps["severity"];
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handlePlanillaSelected = useCallback(
    (mensaje: string) => {
      console.log(mensaje + " PlanillasProvider");
      setValue("novOtras", mensaje);
    },
    [setValue]
  );

  const onSubmit = async (data: PlanillaSchema) => {
    console.log("Form submitted with data:", data);
    try {
      const validationResult = planillaSchema.safeParse(data);

      if (!validationResult.success) {
        const errorMessages = validationResult.error.issues.map((issue) => {
          const path = issue.path.join(".");
          return `${path}: ${issue.message}`;
        });
        console.log("Validation failed:", errorMessages);
        setSnackbar({
          open: true,
          message: `Missing or invalid values: ${errorMessages.join(", ")}`,
          severity: "error",
        });
      } else {
        console.log("Validation passed");
        setSnackbar({
          open: true,
          message: "Form submitted successfully!",
          severity: "success",
        });
        // Here you would typically send the data to your backend
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      setSnackbar({
        open: true,
        message: "Error submitting form. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log("Snackbar closing, reason:", reason);
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Planillas onPlanillas={handlePlanillaSelected} />
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </FormProvider>
  );
}
