import {
  Box,
  Container,
  Typography,
  alpha,
  Alert,
  Button,
  useTheme,
} from "@mui/material";
import { Info as InfoIcon, Warning as WarningIcon } from "@mui/icons-material";

import { HelpDescription } from "../../../actions/helpDescription";
import React from "react";

function SuccessHelpModalMobile({
  onClose,
  helpDescription,
}: {
  onClose: () => void;
  helpDescription: HelpDescription;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: theme.zIndex.modal,
        backgroundColor: theme.palette.background.default,
        overflowY: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          minHeight: "180px",
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
          color: theme.palette.success.contrastText,
          py: 3,
        }}
      >
        <Container sx={{ textAlign: "center" }}>
          <InfoIcon sx={{ fontSize: "2.5rem", mb: 1 }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              mb: 1,
            }}
          >
            {helpDescription.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              maxWidth: "90%",
              mx: "auto",
            }}
          >
            {helpDescription.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* Pasos del proceso */}
      <Box sx={{ py: 2, backgroundColor: theme.palette.background.paper }}>
        <Container>
          {helpDescription.steps.map((step, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                <Box
                  sx={{
                    fontSize: "1.5rem",
                    mt: -0.5,
                  }}
                >
                  <Box sx={{ mt: -0.5 }}>
                    {typeof step.icon === "string"
                      ? step.icon
                      : React.createElement(step.icon as React.ComponentType)}
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: alpha(theme.palette.success.main, 0.2),
                      color: theme.palette.success.contrastText,
                      borderRadius: 20,
                      px: 1.5,
                      py: 0.25,
                      display: "inline-block",
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                    }}
                  >
                    Paso {step.step}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mt: 0.5,
                    }}
                  >
                    {step.title}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  pl: 3.5,
                  borderLeft: `2px solid ${theme.palette.success.main}`,
                  py: 0.5,
                }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Container>
      </Box>

      {/* Información crítica */}
      {helpDescription.criticalInfo &&
        helpDescription.criticalInfo.length > 0 && (
          <Box sx={{ px: 3, py: 2 }}>
            <Alert
              severity="warning"
              sx={{
                backgroundColor: alpha(theme.palette.warning.main, 0.1),
                borderLeft: `4px solid ${theme.palette.warning.dark}`,
              }}
              icon={<WarningIcon />}
            >
              <Typography variant="body2" fontWeight="bold">
                ¡Importante para este paso!
              </Typography>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {helpDescription.criticalInfo.map((info, index) => (
                  <li key={index}>
                    <Typography variant="body2">{info}</Typography>
                  </li>
                ))}
              </ul>
            </Alert>
          </Box>
        )}

      {/* Acciones */}
      <Box
        sx={{
          py: 3,
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
          color: theme.palette.success.contrastText,
          textAlign: "center",
        }}
      >
        <Container>
          <Button
            variant="contained"
            size="large"
            onClick={onClose}
            sx={{
              px: 3,
              py: 1.2,
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: 50,
              backgroundColor: theme.palette.success.contrastText,
              color: theme.palette.success.main,
            }}
          >
            Entiendo, continuar
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default SuccessHelpModalMobile;
