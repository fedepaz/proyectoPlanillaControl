import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Modal,
  Button,
  Stack,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Planillas } from "../Planillas";
import {
  PlanillaSchema,
  defaultValuesPlanilla,
  planillaSchema,
} from "../../types/planillaSchema";

// Mock user data
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  oficialId: { id: "OFF001" },
};

export function PlanillaExample() {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<PlanillaSchema | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const methods = useForm<PlanillaSchema>({
    mode: "onChange",
    resolver: zodResolver(planillaSchema),
    defaultValues: defaultValuesPlanilla,
  });

  const { handleSubmit, setValue } = methods;

  // Set default values (simulating useAuth effect)
  React.useEffect(() => {
    setValue("datosPsa.responsable", mockUser.oficialId.id);
  }, [setValue]);

  const onSubmit = async (data: PlanillaSchema) => {
    console.log("Form submitted with data:", data);
    setSubmittedData(data);
    setShowModal(true);
  };

  const handleBack = (goHome: boolean) => {
    if (goHome) {
      setActiveStep(0);
      methods.reset();
      setSubmittedData(null);
    }
  };

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, 5));
  const handlePrevious = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const setError = (message: string | null) => {
    setErrorMessage(message);
  };

  const renderDataSection = (title: string, data: any) => {
    if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
      return null;
    }

    return (
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ pl: 2 }}>
          {Object.entries(data).map(([key, value]) => {
            if (value === null || value === undefined || value === "")
              return null;

            if (typeof value === "object" && !Array.isArray(value)) {
              return (
                <Box key={key} sx={{ mb: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <Typography key={subKey} variant="body2" sx={{ mb: 0.5 }}>
                        <strong>
                          {subKey.replace(/([A-Z])/g, " $1").trim()}:
                        </strong>{" "}
                        {String(subValue)}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              );
            }

            if (Array.isArray(value)) {
              return (
                <Box key={key} sx={{ mb: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    {value.map((item, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        •{" "}
                        {typeof item === "object"
                          ? JSON.stringify(item, null, 2)
                          : String(item)}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              );
            }

            return (
              <Typography key={key} variant="body2" sx={{ mb: 0.5 }}>
                <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong>{" "}
                {String(value)}
              </Typography>
            );
          })}
        </Box>
      </Paper>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Planilla Example
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Planillas
            activeStep={activeStep}
            setErrorMessage={setError}
            clearErrorMessage={clearErrorMessage}
            onBack={handleBack}
            onNext={handleNext}
            onPrevious={handlePrevious}
            user={mockUser}
          />
        </form>
      </FormProvider>

      {errorMessage && (
        <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
          <Card sx={{ bgcolor: "error.light", color: "error.contrastText" }}>
            <CardContent>
              <Typography variant="body2">{errorMessage}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Data Display Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="submitted-data-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: "80%", lg: "70%" },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h4" component="h2" color="primary">
              📋 Submitted Form Data
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setShowModal(false)}
              sx={{ minWidth: "auto", px: 2 }}
            >
              ✕
            </Button>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {submittedData && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {renderDataSection("Datos PSA", submittedData.datosPsa)}
                {renderDataSection("Datos de Vuelo", submittedData.datosVuelo)}
                {renderDataSection(
                  "Datos Terrestres",
                  submittedData.datosTerrestre
                )}
                {renderDataSection(
                  "Datos de Seguridad",
                  submittedData.datosSeguridad
                )}
                {renderDataSection(
                  "Datos de Vehículos",
                  submittedData.datosVehiculos
                )}
                {renderDataSection("Novedades", submittedData.datosNovedades)}
              </Grid>
            </Grid>
          )}

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowModal(false);
                setActiveStep(0);
                methods.reset();
                setSubmittedData(null);
              }}
              sx={{ minWidth: "150px" }}
            >
              Start New Form
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
