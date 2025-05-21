import {
  Button,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
//import { useFormContext } from "react-hook-form";
import { PlanillaSchema } from "../types/planillaSchema";
import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { RHFTextField } from "../../components/RHFTextField";
import { FormStepper } from "./planillaComponents/components/formStepperComponent";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";
import { DatosSeguridad } from "./planillaComponents/datosSeguridad";
import { DatosVehiculos } from "./planillaComponents/datosVehiculos";
import { DatosPsa } from "./planillaComponents/datosPsa";
import { useStepValidation } from "../hooks/useStepValidation";

interface PlanillaProps {
  activeStep: number;
  setErrorMessage: (message: string | null) => void;
  clearErrorMessage: () => void;
  onBack: (data: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function Planillas({
  activeStep,
  setErrorMessage,
  clearErrorMessage,
  onBack,
  onNext,
  onPrevious,
}: PlanillaProps) {
  //const { setValue } = useFormContext<PlanillaSchema>();

  const { validateCurrentStep } = useStepValidation(
    activeStep,
    setErrorMessage
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sendBack = () => {
    onBack(false);
  };

  const handleNext = async () => {
    clearErrorMessage();
    const isValid = await validateCurrentStep();
    if (isValid) {
      onNext();
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <DatosPsa />
          </Paper>
        );
      case 1:
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <DatosVuelo />
          </Paper>
        );
      case 2:
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <DatosTerrestre />
          </Paper>
        );
      case 3:
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <DatosSeguridad />
          </Paper>
        );
      case 4:
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <DatosVehiculos />
          </Paper>
        );
      case 5:
        return (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <Stack spacing={2}>
              <RHFTextField<PlanillaSchema>
                name="novEquipajes"
                label="Novedades Equipajes"
                multiline
                rows={2}
              />
              <RHFTextField<PlanillaSchema>
                name="novInspeccion"
                label="Novedades Inspección"
                multiline
                rows={2}
              />
              <RHFTextField<PlanillaSchema>
                name="novOtras"
                label="Otras Novedades"
                multiline
                rows={2}
              />
            </Stack>
          </Paper>
        );
      default:
        return null;
    }
  };

  const isLastStep = activeStep === 5;

  return (
    <Container
      maxWidth={isMobile ? "sm" : "md"}
      sx={{
        pb: isMobile ? 4 : 2,
        overflowY: "auto",
      }}
    >
      <FormStepper activeStep={activeStep} />
      <Stack
        sx={{
          gap: 3,
          minHeight: "calc(100vh - 200px)",
          justifyContent: "space-between",
        }}
      >
        {renderStepContent()}

        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "space-between",
            }}
          >
            {activeStep === 0 ? (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={sendBack}
                sx={{ minWidth: "120px" }}
              >
                Regresar
              </Button>
            ) : (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={onPrevious}
                sx={{ minWidth: "120px" }}
              >
                Anterior
              </Button>
            )}
            {isLastStep ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                sx={{ minWidth: "120px" }}
              >
                Finalizar
              </Button>
            ) : (
              <Button
                type="button"
                variant="contained"
                color="primary"
                startIcon={<ArrowForwardIcon />}
                onClick={handleNext}
                sx={{ minWidth: "120px" }}
              >
                Siguiente
              </Button>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
