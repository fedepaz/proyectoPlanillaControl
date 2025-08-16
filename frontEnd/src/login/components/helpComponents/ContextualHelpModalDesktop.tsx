import {
  Box,
  Grid,
  alpha,
  Typography,
  Alert,
  Button,
  useTheme,
} from "@mui/material";

import { Info as InfoIcon, Warning as WarningIcon } from "@mui/icons-material";
import { HelpDescription } from "../../../actions/helpDescription";
import React from "react";

function ContextualHelpModalDesktop({
  open,
  onClose,
  helpDescription,
}: {
  open: boolean;
  onClose: () => void;
  helpDescription: HelpDescription;
}) {
  const theme = useTheme();

  if (!open) return null;

  return (
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
        minHeight: "100vh",
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
        <Grid container sx={{ height: "100%", minHeight: 0 }}>
          {/* Columna izquierda - Información */}
          <Grid item xs={12} md={6} sx={{ display: "flex", height: "100%" }}>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: theme.palette.primary.contrastText,
                p: 2.5, // Reduced padding from 4 to 2.5
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
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
                    {helpDescription.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1" // Changed from h6 to body1
                  sx={{
                    opacity: 0.9,
                    fontSize: "0.9rem", // Smaller subtitle
                  }}
                >
                  {helpDescription.subtitle}
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
                {helpDescription.steps.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 1.5, // Reduced margin from 2.5 to 1.5
                      pb: 1.5, // Reduced padding from 2 to 1.5
                      borderBottom:
                        index < helpDescription.steps.length - 1
                          ? `1px solid ${alpha(
                              theme.palette.primary.contrastText,
                              0.2
                            )}`
                          : "none",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1.5, mb: 0.5 }}>
                      {" "}
                      {/* Reduced gaps and margins */}
                      <Box
                        sx={{
                          fontSize: "1.2rem", // Reduced icon size
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ mt: -0.5 }}>
                          {typeof step.icon === "string"
                            ? step.icon
                            : React.createElement(
                                step.icon as React.ComponentType
                              )}
                        </Box>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="caption" // Changed from body2 to caption
                          sx={{
                            backgroundColor: alpha(
                              theme.palette.primary.contrastText,
                              0.2
                            ),
                            color: "white",
                            borderRadius: 20,
                            px: 1,
                            py: 0.25, // Reduced padding
                            display: "inline-block",
                            fontWeight: "bold",
                            fontSize: "0.75rem", // Smaller step number
                          }}
                        >
                          Paso {step.step}
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
                          {step.title}
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
                      {step.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Columna derecha - Información crítica */}
          <Grid item xs={12} md={6} sx={{ display: "flex", height: "100%" }}>
            <Box
              sx={{
                p: 2.5, // Reduced padding from 4 to 2.5
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
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
                  <Typography
                    variant="body2" // Changed from body1 to body2
                    sx={{
                      opacity: 0.9,
                      fontSize: "0.85rem", // Smaller text
                    }}
                  >
                    El botón de ayuda se encuentra en la esquina superior
                    derecha de la pantalla.
                  </Typography>
                </Box>

                {helpDescription.criticalInfo &&
                  helpDescription.criticalInfo.length > 0 && (
                    <Alert
                      severity="warning"
                      sx={{
                        backgroundColor: alpha(
                          theme.palette.warning.main,
                          0.08
                        ),
                        borderLeft: `4px solid ${theme.palette.warning.main}`,
                        maxHeight: "300px", // Increased from 200px to 300px for more critical info
                        overflowY: "auto",
                      }}
                    >
                      <Typography
                        variant="body2" // Changed from body1 to body2
                        component="div"
                        sx={{ fontSize: "0.8rem" }} // Smaller critical info text
                      >
                        <ul
                          style={{
                            paddingLeft: "16px", // Reduced padding
                            margin: 0,
                            lineHeight: "1.4", // Tighter line height
                          }}
                        >
                          {helpDescription.criticalInfo.map((info, index) => (
                            <li key={index} style={{ marginBottom: "6px" }}>
                              {" "}
                              {/* Reduced margin */}
                              {info}
                            </li>
                          ))}
                        </ul>
                      </Typography>
                    </Alert>
                  )}
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
                {/* Reduced padding */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={onClose}
                  sx={{
                    px: 3, // Reduced padding
                    py: 1.25, // Reduced padding
                    fontSize: "0.9rem", // Smaller button text
                    fontWeight: 600,
                    borderRadius: 50,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
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
  );
}

export default ContextualHelpModalDesktop;
