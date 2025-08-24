"use client";

import {
  useTheme,
  useMediaQuery,
  Container,
  Paper,
  Stack,
  Button,
} from "@mui/material";

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
import { BasePersonalOption } from "../../types/option";
import { useState } from "react";

interface PlanillaProps {
  activeStep: number;
  setPlanillaStep: (step: number) => void;
  setErrorMessage: (message: string | null) => void;
  clearErrorMessage: () => void;
  onBack: (data: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinalize: () => Promise<void>;
  user: User | null;
  setIsReviewing: (isReviewing: boolean) => void;
}

export function Planillas({
  activeStep,
  setPlanillaStep,
  setErrorMessage,
  clearErrorMessage,
  onBack,
  onNext,
  onPrevious,
  onFinalize,
  setIsReviewing,
}: PlanillaProps) {
  const { validateCurrentStep } = useStepValidation(
    activeStep,
    setErrorMessage
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [personalList, setPersonalList] = useState<BasePersonalOption[]>([]);

  const sendBack = () => {
    if (activeStep === 6) {
      setIsReviewing(false);
    }
    setPlanillaStep(activeStep - 1);
    onBack(true);
  };

  const handleNext = async () => {
    clearErrorMessage();
    const isValid = await validateCurrentStep();
    if (isValid) {
      setPlanillaStep(activeStep + 1);
      onNext();
    }
  };

  const handleFinalize = async () => {
    clearErrorMessage();
    setIsReviewing(false);
    setPlanillaStep(activeStep + 1);
    await onFinalize();
  };

  const handlePersonalListChange = (personalList: BasePersonalOption[]) => {
    setPersonalList(personalList);
  };

  const renderStepContent = () => {
    const stepContent = (() => {
      switch (activeStep) {
        case 0:
          return <DatosPsa />;
        case 1:
          return <DatosVuelo />;
        case 2:
          return (
            <DatosTerrestre onPersonalListChange={handlePersonalListChange} />
          );
        case 3:
          return <DatosSeguridad />;
        case 4:
          return <DatosVehiculos personalList={personalList} />;
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
      {/* Botón de ayuda específico para el paso actual */}

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
