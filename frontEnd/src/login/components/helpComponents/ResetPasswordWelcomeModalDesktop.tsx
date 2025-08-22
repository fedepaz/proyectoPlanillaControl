// src/login/components/ResetPasswordWelcomeModalDesktop.tsx
"use client";

import {
  Fade,
  Box,
  alpha,
  Grid,
  Typography,
  Button,
  useTheme,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Info as InfoIcon, Warning as WarningIcon } from "@mui/icons-material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import React from "react";

type Feature = {
  step: string;
  title: string;
  description: string;
  icon: string | React.ReactNode | React.ComponentType;
};

interface ResetPasswordWelcomeModalDesktopProps {
  open: boolean;
  onGetStarted: () => void;
  features: Feature[];
}

export default function ResetPasswordWelcomeModalDesktop({
  open,
  onGetStarted,
  features,
}: ResetPasswordWelcomeModalDesktopProps) {
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
          backgroundColor: alpha(theme.palette.background.default, 0.9),
          overflow: "auto",
          minHeight: ["100dvh", "100vh"],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "min(98vw, 1400px)", // Increased width to use more screen space
            height: "min(95vh, 900px)", // Increased height to fit more content
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: `0 20px 50px ${alpha(theme.palette.common.black, 0.3)}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            sx={{
              height: "100%",
              minHeight: 0,
            }}
          >
            {/* Columna izquierda - Información crítica */}
            <Grid item xs={12} md={6} sx={{ display: "flex", height: "100%" }}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                  color: theme.palette.warning.contrastText,
                  p: 2.5, // Reduced padding from 4 to 2.5
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: `0 10px 30px ${alpha(
                    theme.palette.common.black,
                    0.15
                  )}`,
                }}
              >
                <Box sx={{ mb: 2, flexShrink: 0 }}>
                  {" "}
                  {/* Reduced margin bottom from 3 to 2 */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    {" "}
                    {/* Reduced margin bottom */}
                    <InfoIcon sx={{ fontSize: "1.5rem" }} />{" "}
                    {/* Reduced icon size */}
                    <Typography
                      variant="h5" // Changed from h4 to h5 for smaller title
                      component="h1"
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.25rem", // Explicit smaller font size
                      }}
                    >
                      ¡Cambio de contraseña MANUAL!
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1" // Changed from h6 to body1
                    sx={{
                      opacity: 0.9,
                      fontSize: "0.9rem", // Smaller subtitle
                    }}
                  >
                    IMPORTANTE: Este proceso requiere aprobación del
                    administrador
                  </Typography>
                </Box>

                <Alert
                  severity="error"
                  icon={<WarningAmberIcon fontSize="inherit" />}
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.warning.contrastText,
                      0.2
                    ),
                    color: "white",
                    mb: 3,
                    "& .MuiAlert-message": { width: "100%" },
                  }}
                >
                  <AlertTitle sx={{ fontWeight: 700 }}>
                    ¡NO ES AUTOMÁTICO!
                  </AlertTitle>
                  <Typography variant="body1">
                    El administrador debe aprobar manualmente tu solicitud.
                    <strong> Debes revisar DIARIAMENTE</strong> si fue aprobada.
                  </Typography>
                </Alert>

                <Box
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    minHeight: 0,
                    pr: 1,
                  }}
                >
                  {features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 1.5, // Reduced margin from 2.5 to 1.5
                        pb: 1.5, // Reduced padding from 2 to 1.5
                        borderBottom:
                          index < features.length - 1
                            ? `1px solid ${alpha(
                                theme.palette.primary.contrastText,
                                0.2
                              )}`
                            : "none",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1.5, mb: 0.5 }}>
                        {" "}
                        <Box
                          sx={{
                            fontSize: "1.2rem", // Reduced icon size
                            display: "flex",
                            alignItems: "center",
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
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="caption" // Changed from body2 to caption
                            sx={{
                              backgroundColor: alpha(
                                theme.palette.warning.contrastText,
                                0.3
                              ),
                              color: "white",
                              borderRadius: 20,
                              px: 1,
                              py: 0.25, // Re
                              display: "inline-block",
                              fontWeight: "bold",
                              fontSize: "0.75rem", // Smaller step number
                            }}
                          >
                            Paso {feature.step}
                          </Typography>
                          <Typography
                            variant="body2" // Changed from h6 to body2
                            sx={{
                              fontWeight: 700,
                              color: "white",
                              mt: 0.25, // Reduced margin
                              fontSize: "0.9rem", // Smaller title
                            }}
                          >
                            {feature.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body2" // Changed from body1 to body2
                        sx={{
                          opacity: 0.9,
                          lineHeight: 1.4, // Tighter line height
                          pl: 3, // Reduced padding from 4 to 3
                          fontSize: "0.8rem", // Smaller description text
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Columna derecha - Acciones y advertencias */}
            <Grid item xs={12} md={6} sx={{ display: "flex", height: "100%" }}>
              <Box
                sx={{
                  background: alpha(theme.palette.background.paper, 0.85),
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  p: 2.5, // Reduced padding from 4 to 2.5
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: `0 8px 32px ${alpha(
                    theme.palette.common.black,
                    0.08
                  )}`,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 2, // Reduced gap from 3 to 2
                    minHeight: 0,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <WarningIcon
                      sx={{
                        fontSize: "2.5rem", // Reduced icon size
                        color: theme.palette.warning.main,
                        mb: 1.5, // Reduced margin
                      }}
                    />
                    <Typography
                      variant="h6" // Changed from h5 to h6
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5, // Reduced margin
                        fontSize: "1.1rem", // Smaller title
                      }}
                    >
                      ¡Importante para este paso!
                    </Typography>
                  </Box>

                  <Alert
                    severity="error"
                    sx={{
                      mb: 4,
                      backgroundColor: alpha(theme.palette.error.main, 0.08),
                      borderLeft: `4px solid ${theme.palette.error.main}`,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      ¡IMPORTANTE PARA TU USO DIARIO!
                    </Typography>
                    <Typography
                      variant="body2" // Changed from body1 to body2
                      component="div"
                      sx={{ fontSize: "0.8rem" }} // Smaller critical info text
                    >
                      <ul
                        style={{
                          paddingLeft: "20px",
                          margin: 0,
                          lineHeight: "1.6",
                        }}
                      >
                        <li>
                          El administrador podría tardar{" "}
                          <strong>hasta 7 días hábiles</strong> en aprobar
                        </li>
                        <li>
                          <strong>NO recibirás notificación por email</strong>{" "}
                          cuando sea aprobada
                        </li>
                        <li>
                          Debes revisar <strong>DIARIAMENTE</strong> ingresando
                          nuevamente aquí
                        </li>
                        <li>
                          Si olvidas tu contraseña nuevamente, debes repetir
                          todo el proceso
                        </li>
                      </ul>
                    </Typography>
                  </Alert>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexShrink: 0,
                    pt: 1.5,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      textAlign: "center",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Este proceso manual es temporal. Próximamente
                    implementaremos
                    <strong> notificaciones automáticas por email</strong> para
                    hacerlo más cómodo.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexShrink: 0,
                    pt: 1.5,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 3, // Reduced padding
                      py: 1.25, // Reduced padding
                      fontSize: "0.9rem", // Smaller button text
                      fontWeight: 600,
                      borderRadius: 50,
                      backgroundColor: theme.palette.warning.contrastText,
                      color: theme.palette.warning.main,
                      boxShadow: `0 4px 20px ${alpha(
                        theme.palette.warning.main,
                        0.3
                      )}`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 6px 25px ${alpha(
                          theme.palette.warning.main,
                          0.4
                        )}`,
                      },
                    }}
                  >
                    Entiendo, continuar
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fade>
  );
}
