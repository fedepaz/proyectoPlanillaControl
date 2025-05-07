import type React from "react";

import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import SecurityIcon from "@mui/icons-material/Security";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DescriptionIcon from "@mui/icons-material/Description";

interface FormStepperProps {
  activeStep: number;
  steps?: string[];
  icons?: React.ReactNode[];
}

export function FormStepper({ activeStep, steps, icons }: FormStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const defaultSteps = [
    "Datos de vuelo",
    "Datos de terrestre",
    "Datos de seguridad",
    "Datos de vehiculos",
    "Datos de novedades",
  ];
  const defaultIcons = [
    <FlightIcon key="flight" />,
    <DirectionsWalkIcon key="walk" />,
    <SecurityIcon key="security" />,
    <DriveEtaIcon key="car" />,
    <DescriptionIcon key="doc" />,
  ];

  const stepsToUse = steps || defaultSteps;
  const iconsToUse = icons || defaultIcons;

  if (isMobile) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 1.5,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          bgcolor:
            theme.palette.mode === "dark"
              ? "background.paper"
              : "primary.light",
          color:
            theme.palette.mode === "dark"
              ? "text.primary"
              : "primary.contrastText",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {iconsToUse[activeStep]}
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Paso {activeStep + 1} de {stepsToUse.length}:{" "}
            {stepsToUse[activeStep]}
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (isTablet) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {stepsToUse.map((label, index) => (
            <Step key={label}>
              <StepLabel icon={iconsToUse[index]}>{""}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            mt: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Paso {activeStep + 1} de {stepsToUse.length}:{" "}
            {stepsToUse[activeStep]}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 1,
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepsToUse.map((label, index) => (
          <Step key={label}>
            <StepLabel icon={iconsToUse[index]}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}
