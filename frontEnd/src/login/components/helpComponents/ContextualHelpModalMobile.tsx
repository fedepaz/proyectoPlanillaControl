import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  alpha,
  CardContent,
  Alert,
  Stack,
  Button,
  useTheme,
} from "@mui/material";

import { Info as InfoIcon, Warning as WarningIcon } from "@mui/icons-material";

import { HelpDescription } from "../../../actions/helpDescription";
import React from "react";

function ContextualHelpModalMobile({
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
        backgroundColor: theme.palette.background.default,
        overflowY: "auto",
  minHeight: ["100dvh", "100vh"],
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          minHeight: "200px",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: theme.palette.primary.contrastText,
          py: 4,
        }}
      >
        <Container sx={{ textAlign: "center" }}>
          <InfoIcon sx={{ fontSize: "2.5rem", mb: 1 }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
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
      <Box sx={{ py: 3, backgroundColor: theme.palette.background.paper }}>
        <Container>
          <Grid container spacing={2}>
            {helpDescription.steps.map((step, index) => (
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
                          fontSize: theme.typography.h5.fontSize,
                          mt: -0.5,
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
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            borderRadius: 20,
                            px: 1.5,
                            py: 0.25,
                            display: "inline-block",
                            fontWeight: theme.typography.fontWeightBold,
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
                        borderLeft: `2px solid ${theme.palette.primary.main}`,
                        py: 0.5,
                      }}
                    >
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Información crítica */}
      {helpDescription.criticalInfo &&
        helpDescription.criticalInfo.length > 0 && (
          <Box
            sx={{
              px: 3,
              py: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Alert
              severity="warning"
              sx={{
                backgroundColor: alpha(theme.palette.warning.main, 0.1),
                borderLeft: `4px solid ${theme.palette.warning.dark}`,
              }}
              icon={<WarningIcon />}
            >
              <Typography variant="body2" sx={{ fontWeight: theme.typography.fontWeightBold }}>
                Información importante:
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
          py: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: theme.palette.primary.contrastText,
          textAlign: "center",
        }}
      >
        <Container>
          <Stack spacing={2} sx={{ maxWidth: 300, mx: "auto" }}>
            <Button
              variant="contained"
              size="large"
              onClick={onClose}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 50,
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
              }}
            >
              Entiendo, continuar
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default ContextualHelpModalMobile;
