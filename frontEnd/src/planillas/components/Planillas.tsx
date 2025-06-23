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
import { ErrorProvider } from "../../provider/ErrorProvider";
import { StepErrorWrapper } from "./planillaComponents/components/stepErrorWrapperComponent";
import { UserRole } from "../../actions/types";

interface PlanillaProps {
  activeStep: number;
  setErrorMessage: (message: string | null) => void;
  clearErrorMessage: () => void;
  onBack: (data: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  userRole: UserRole;
}

export function Planillas({
  activeStep,
  setErrorMessage,
  clearErrorMessage,
  onBack,
  onNext,
  onPrevious,
  userRole,
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
    const stepContent = (() => {
      switch (activeStep) {
        case 0:
          return <DatosPsa />;
        case 1:
          return <DatosVuelo />;
        case 2:
          return <DatosTerrestre userRole={userRole} />;
        case 3:
          return <DatosSeguridad />;
        case 4: // vehiculos
          return <DatosVehiculos />;
        case 5:
          return (
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
          );
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
