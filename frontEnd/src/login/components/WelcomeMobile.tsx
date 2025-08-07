"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import useTheme from "@mui/material/styles/useTheme";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { alpha } from "@mui/material/styles";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

interface WelcomeModalMobileProps {
  open: boolean;
  onClose: () => void;
  onGetStarted: () => void;
  features: Array<Feature>;
}

const WelcomeModalMobile: React.FC<WelcomeModalMobileProps> = ({
  open,
  onClose,
  onGetStarted,
  features,
}) => {
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
        {/* Hero Section */}
        <Box
          sx={{
            minHeight: "calc(100vh - 64px)", // Adjust as needed, or remove if content is short
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: theme.palette.primary.contrastText,
            position: "relative",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            py: 8,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 20% 30%, ${alpha(
                theme.palette.primary.light,
                0.3
              )} 0%, transparent 50%)`,
              pointerEvents: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 80% 70%, ${alpha(
                theme.palette.secondary.main,
                0.2
              )} 0%, transparent 50%)`,
              pointerEvents: "none",
            },
          }}
        >
          <Container
            maxWidth="md"
            sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
          >
            <Fade in={open} timeout={800}>
              <Box>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", sm: "3rem" },
                    lineHeight: 1.1,
                    mb: 2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Bienvenido a{" "}
                  <Box
                    component="span"
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.secondary.light}, ${theme.palette.primary.contrastText})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "block",
                      mt: 1,
                    }}
                  >
                    PlanillasPro
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.95,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    mb: 4,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  La plataforma profesional para gestionar tus planillas de
                  forma eficiente.
                </Typography>
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            py: 8,
            backgroundColor: theme.palette.background.paper,
            flexGrow: 1,
          }}
        >
          <Container maxWidth="md">
            <Fade in={open} timeout={1200}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  textAlign="center"
                  sx={{
                    fontWeight: 700,
                    mb: 6,
                    color: theme.palette.text.primary,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -16,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 60,
                      height: 3,
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: theme.shape.borderRadius,
                    },
                  }}
                >
                  ¿Por qué elegir nuestra plataforma?
                </Typography>
                <Grid container spacing={3}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} key={index}>
                      <Slide
                        direction="up"
                        in={open}
                        timeout={1000 + index * 200}
                      >
                        <Card
                          sx={{
                            backgroundColor: alpha(
                              theme.palette.background.paper,
                              0.95
                            ),
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${alpha(
                              theme.palette.divider,
                              0.2
                            )}`,
                            borderRadius: theme.shape.borderRadius * 2,
                            transition: theme.transitions.create(
                              ["transform", "box-shadow"],
                              {
                                duration: theme.transitions.duration.standard,
                                easing: theme.transitions.easing.easeInOut,
                              }
                            ),
                            "&:hover": {
                              transform: "translateY(-4px) scale(1.01)",
                              boxShadow: `0 10px 30px ${alpha(
                                theme.palette.common.black,
                                0.2
                              )}`,
                              backgroundColor: theme.palette.background.paper,
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  color: theme.palette.primary.main,
                                  backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                  ),
                                  borderRadius: theme.shape.borderRadius * 1.5,
                                  p: 1.5,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: `2px solid ${alpha(
                                    theme.palette.primary.main,
                                    0.2
                                  )}`,
                                }}
                              >
                                {feature.icon}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="h6"
                                  component="h3"
                                  gutterBottom
                                  sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.primary,
                                    mb: 1,
                                  }}
                                >
                                  {feature.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    lineHeight: 1.5,
                                    fontSize: "0.95rem",
                                    color: theme.palette.text.secondary,
                                  }}
                                >
                                  {feature.description}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Slide>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Call to Action Section (Paragraph + Buttons) */}
        <Box
          sx={{
            py: 8,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: theme.palette.primary.contrastText,
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Fade in={open} timeout={1400}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.95,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    mb: 6,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  Crea tu cuenta gratuita y comienza a gestionar tus planillas
                  de manera profesional. Solo te tomará unos minutos configurar
                  tu usuario.
                </Typography>
                <Stack
                  direction="column"
                  spacing={2}
                  sx={{ maxWidth: 300, mx: "auto" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: "1rem",
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: theme.shape.borderRadius * 2,
                      backgroundColor: theme.palette.primary.contrastText,
                      color: theme.palette.primary.main,
                      boxShadow: `0 8px 32px ${alpha(
                        theme.palette.common.black,
                        0.3
                      )}`,
                      transition: theme.transitions.create(
                        ["transform", "box-shadow"],
                        {
                          duration: theme.transitions.duration.short,
                          easing: theme.transitions.easing.easeOut,
                        }
                      ),
                      "&:hover": {
                        backgroundColor: theme.palette.primary.contrastText,
                        transform: "translateY(-3px)",
                        boxShadow: `0 12px 40px ${alpha(
                          theme.palette.common.black,
                          0.4
                        )}`,
                      },
                    }}
                  >
                    Crear Cuenta Gratis
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={onClose}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: theme.shape.borderRadius * 2,
                      borderColor: alpha(
                        theme.palette.primary.contrastText,
                        0.3
                      ),
                      color: theme.palette.primary.contrastText,
                      "&:hover": {
                        borderColor: theme.palette.primary.contrastText,
                        backgroundColor: alpha(
                          theme.palette.primary.contrastText,
                          0.1
                        ),
                      },
                    }}
                  >
                    Ya tengo cuenta
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Container>
        </Box>
      </Box>
    </Fade>
  );
};

export default WelcomeModalMobile;
