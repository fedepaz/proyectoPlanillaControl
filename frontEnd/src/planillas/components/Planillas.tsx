import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import Paper from "@mui/material/Paper";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";

import { DatosVuelo } from "./planillaComponents/datosVuelo";
import { FormStepper } from "./planillaComponents/components/formStepperComponent";
import { DatosTerrestre } from "./planillaComponents/datosTerrestre";
import { DatosSeguridad } from "./planillaComponents/datosSeguridad";
import { DatosVehiculos } from "./planillaComponents/datosVehiculos";
import { DatosPsa } from "./planillaComponents/datosPsa";
import { useStepValidation } from "../hooks/useStepValidation";
import { ErrorProvider } from "../../provider/ErrorProvider";
import { StepErrorWrapper } from "./planillaComponents/components/stepErrorWrapperComponent";
import { User } from "../../actions/types";
import { DatosNovedades } from "./planillaComponents/datosNovedades";

interface PlanillaProps {
  activeStep: number;
  setErrorMessage: (message: string | null) => void;
  clearErrorMessage: () => void;
  onBack: (data: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinalize: () => Promise<void>;
  user: User | null;
}

export function Planillas({
  activeStep,
  setErrorMessage,
  clearErrorMessage,
  onBack,
  onNext,
  onPrevious,
  onFinalize,
}: PlanillaProps) {
  const { validateCurrentStep } = useStepValidation(
    activeStep,
    setErrorMessage
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sendBack = () => {
    onBack(true);
  };

  const handleNext = async () => {
    clearErrorMessage();
    const isValid = await validateCurrentStep();
    if (isValid) {
      onNext();
    }
  };

  const handleFinalize = async () => {
    clearErrorMessage();
    await onFinalize();
  };

  const renderStepContent = () => {
    const stepContent = (() => {
      switch (activeStep) {
        case 0:
          return <DatosPsa />;
        case 1:
          return <DatosVuelo />;
        case 2:
          return <DatosTerrestre />;
        case 3:
          return <DatosSeguridad />;
        case 4:
          return <DatosVehiculos />;
        case 5:
          return <DatosNovedades />;
        default:
          return null;
      }
    })();

    return (
      <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
        <ErrorProvider>
          <StepErrorWrapper>{stepContent}</StepErrorWrapper>
        </ErrorProvider>
      </Paper>
    );
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
                type="button"
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                sx={{ minWidth: "120px" }}
                onClick={handleFinalize}
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
