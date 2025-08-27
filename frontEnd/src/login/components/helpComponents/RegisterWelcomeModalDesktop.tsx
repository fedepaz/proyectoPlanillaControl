// src/register/components/RegisterWelcomeModalDesktop.tsx
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
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import React from "react";
import { Info as InfoIcon, Warning as WarningIcon } from "@mui/icons-material";

type Feature = {
  step: string;
  title: string;
  description: string;
  icon: string | React.ReactNode | React.ComponentType;
};

interface RegisterWelcomeModalDesktopProps {
  open: boolean;
  onGetStarted: () => void;
  features: Feature[];
}

function RegisterWelcomeModalDesktop({
  open,
  onGetStarted,
  features,
}: RegisterWelcomeModalDesktopProps) {
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
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: theme.palette.primary.contrastText,
                  p: 2.5, // Reduced padding from 4 to 2.5
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
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
                        
                      }}
                    >
                      ¡Completa tu registro!
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1" // Changed from h6 to body1
                    sx={{
                      opacity: 0.9,
                    }}
                  >
                    Te explicamos qué datos necesitas y por qué:
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    minHeight: 0,
                    pr: 1,
                  }}
                >
                  {features.map((feature, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 2 }}>
                      <Box
                        sx={{
                          fontSize: theme.typography.h4.fontSize,
                          minWidth: "40px",
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
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "primary.contrastText",
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            opacity: 0.9,
                            lineHeight: 1.5,
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Columna derecha - Acciones */}
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
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: theme.typography.fontWeightBold }}>
                      Información CRÍTICA:
                    </Typography>
                    <Typography
                      variant="body2" // Changed from body1 to body2
                      component="div"
                    >
                      <ul
                        style={{
                          paddingLeft: "20px",
                          margin: 0,
                          lineHeight: "1.6",
                        }}
                      >
                        <li>
                          No olvidar tu constraseña!!!{" "}
                          <strong>
                            EL PROCESO PARA RECUPERARLA LUEGO, NO ES AUTOMÁTICO
                          </strong>
                        </li>
                        <li>
                          No son necesarios{" "}
                          <strong>caracteres especiales</strong>
                        </li>
                        <li>
                          Si olvidas tu contraseña, no podrás acceder a tu
                          cuenta
                        </li>
                        <li>Administre los medios...</li>
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
                  {" "}
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      py: 2,
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

export default RegisterWelcomeModalDesktop;
