// src/login/components/ResetPasswordWelcomeModalMobile.tsx
"use client";

import {
  Fade,
  Box,
  alpha,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  useTheme,
  Alert,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Info as InfoIcon, Warning as WarningIcon } from "@mui/icons-material";
import React from "react";

type Feature = {
  step: string;
  title: string;
  description: string;
  icon: string | React.ReactNode | React.ComponentType;
};

interface ResetPasswordWelcomeModalMobileProps {
  open: boolean;
  onGetStarted: () => void;
  features: Feature[];
}

export default function ResetPasswordWelcomeModalMobile({
  open,
  onGetStarted,
  features,
}: ResetPasswordWelcomeModalMobileProps) {
  const theme = useTheme();

  return (
    <Fade in={open} timeout={400} unmountOnExit>
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
            minHeight: "200px",
            background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
            color: theme.palette.warning.contrastText,
            py: 2,
          }}
        >
          <Container sx={{ textAlign: "center" }}>
            <InfoIcon />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: "1.8rem",
                mb: 2,
              }}
            >
              ¡Cambio de contraseña MANUAL!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.9,
                maxWidth: "90%",
                mx: "auto",
              }}
            >
              IMPORTANTE: Este proceso requiere aprobación del administrador
            </Typography>
          </Container>
        </Box>

        {/* Advertencia crítica */}
        <Box
          sx={{ px: 2, py: 2, backgroundColor: theme.palette.background.paper }}
        >
          <Alert
            severity="warning"
            icon={<WarningAmberIcon fontSize="inherit" />}
            sx={{
              backgroundColor: alpha(theme.palette.warning.main, 0.1),
              borderLeft: `4px solid ${theme.palette.warning.dark}`,
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              ¡NO ES AUTOMÁTICO!
            </Typography>
            <Typography variant="body2">
              El administrador debe aprobar manualmente tu solicitud.
              <strong> Debes revisar DIARIAMENTE</strong> si fue aprobada.
            </Typography>
          </Alert>
        </Box>

        {/* Pasos del proceso */}
        <Box sx={{ py: 3, backgroundColor: theme.palette.background.paper }}>
          <Container>
            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.95
                      ),
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      borderRadius: 2,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 12px ${alpha(
                          theme.palette.common.black,
                          0.1
                        )}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                        <Box
                          sx={{
                            fontSize: "1.8rem",
                            mt: -0.5,
                          }}
                        >
                          <Box sx={{ mt: -0.5 }}>
                            {typeof feature.icon === "string"
                              ? feature.icon
                              : React.createElement(
                                  feature.icon as React.ComponentType
                                )}
                          </Box>
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              backgroundColor: theme.palette.warning.main,
                              color: theme.palette.warning.contrastText,
                              borderRadius: 20,
                              px: 1.5,
                              py: 0.25,
                              display: "inline-block",
                              fontWeight: "bold",
                              fontSize: "0.85rem",
                            }}
                          >
                            Paso {feature.step}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.primary,
                              mt: 0.5,
                            }}
                          >
                            {feature.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          pl: 3.5,
                          borderLeft: `2px solid ${theme.palette.warning.main}`,
                          py: 0.5,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Información crítica */}
        <Box
          sx={{ px: 3, py: 2, backgroundColor: theme.palette.background.paper }}
        >
          <Alert
            severity="error"
            sx={{
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              borderLeft: `4px solid ${theme.palette.error.dark}`,
            }}
            icon={<WarningIcon />}
          >
            <Typography variant="body2" fontWeight="bold">
              Información CRÍTICA:
            </Typography>
            <Typography variant="body2">
              • El administrador podría tardar{" "}
              <strong>hasta 7 días hábiles</strong> en aprobar
              <br />• <strong>NO recibirás notificación por email</strong>{" "}
              cuando sea aprobada
              <br />• Debes revisar <strong>DIARIAMENTE</strong> ingresando
              nuevamente aquí
              <br />• Si olvidas tu contraseña nuevamente, debes repetir todo el
              proceso
            </Typography>
          </Alert>
        </Box>

        {/* Acciones */}
        <Box
          sx={{
            py: 4,
            background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
            color: theme.palette.warning.contrastText,
            textAlign: "center",
          }}
        >
          <Container>
            <Stack spacing={2} sx={{ maxWidth: 300, mx: "auto" }}>
              <Button
                variant="contained"
                size="large"
                onClick={onGetStarted}
                endIcon={<ArrowForward />}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 50,
                  backgroundColor: theme.palette.warning.contrastText,
                  color: theme.palette.warning.main,
                }}
              >
                Entiendo, continuar
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Fade>
  );
}
