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
  StepIconProps,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import SecurityIcon from "@mui/icons-material/Security";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";

interface FormStepperProps {
  activeStep: number;
  steps?: string[];
  icons?: React.ReactNode[];
}

// Custom StepIcon component to style the active step differently
function CustomStepIcon(
  props: StepIconProps & { iconComponent: React.ReactNode }
) {
  const { active, completed, iconComponent } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Apply different styling based on step state
        color: active
          ? theme.palette.primary.main
          : completed
          ? theme.palette.success.main
          : theme.palette.text.disabled,
        // Add background for active step
        backgroundColor: active
          ? `${theme.palette.primary.main}20` // 20% opacity version of primary color
          : "transparent",
        borderRadius: "50%",
        padding: active ? 1 : 0,
        transition: "all 0.3s ease",
        transform: active ? "scale(1.2)" : "scale(1)",
        // Add a subtle border for active step
        border: active ? `2px solid ${theme.palette.primary.main}` : "none",
      }}
    >
      {iconComponent}
    </Box>
  );
}

export function FormStepper({ activeStep, steps, icons }: FormStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const defaultSteps = [
    "Datos de Psa",
    "Datos de vuelo",
    "Datos de terrestre",
    "Datos de seguridad",
    "Datos de vehiculos",
    "Datos de novedades",
  ];
  const defaultIcons = [
    <BadgeIcon key="badge" />,
    <FlightIcon key="flight" />,
    <DirectionsWalkIcon key="walk" />,
    <SecurityIcon key="security" />,
    <DriveEtaIcon key="car" />,
    <DescriptionIcon key="doc" />,
  ];

  const stepsToUse = steps || defaultSteps;
  const iconsToUse = icons || defaultIcons;

  // Mobile view
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
          <Box
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: `${theme.palette.primary.main}20`,
              borderRadius: "50%",
              padding: 1,
              display: "flex",
            }}
          >
            {iconsToUse[activeStep]}
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Paso {activeStep + 1} de {stepsToUse.length}:{" "}
            {stepsToUse[activeStep]}
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Tablet view
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
              <StepLabel
                StepIconComponent={(props) => (
                  <CustomStepIcon
                    {...props}
                    iconComponent={iconsToUse[index]}
                  />
                )}
              >
                {""}
              </StepLabel>
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

  // Desktop view
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
            <StepLabel
              StepIconComponent={(props) => (
                <CustomStepIcon {...props} iconComponent={iconsToUse[index]} />
              )}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}
