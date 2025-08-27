"use client";
import React from "react";

import ArrowForward from "@mui/icons-material/ArrowForward";
import { alpha, useTheme } from "@mui/material/styles";
import {
  Fade,
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Button,
  Slide,
  Card,
  CardContent,
} from "@mui/material";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type Benefit = {
  icon: React.ReactNode;
  text: string;
};

type Stat = {
  number: string;
  label: string;
};

interface WelcomeLargeProps {
  open: boolean;
  onClose: () => void;
  onGetStarted: () => void;
  features: Array<Feature>;
  benefits?: Array<Benefit>;
  stats?: Array<Stat>;
}

const WelcomeLarge: React.FC<WelcomeLargeProps> = ({
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
          overflow: "auto",
    minHeight: ["100dvh", "100vh"],
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            minHeight: "100vh",
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: theme.palette.primary.contrastText,
            position: "relative",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
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
          <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
            <Grid
              container
              spacing={8}
              alignItems="center"
              sx={{ minHeight: "100vh", py: 8 }}
            >
              {/* Left Side - Hero Content */}
              <Grid item xs={12} lg={6}>
                <Fade in={open} timeout={800}>
                  <Box>
                    <Typography
                      variant="h1"
                      component="h1"
                      sx={{
                        fontWeight: 800,
                        lineHeight: 1.1,
                        mb: 3,
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
                      variant="h4"
                      sx={{
                        opacity: 0.95,
                        fontWeight: 400,
                        lineHeight: 1.4,
                        mb: 6,
                        maxWidth: "90%",
                        color: theme.palette.primary.contrastText,
                      }}
                    >
                      La plataforma profesional para gestionar tus planillas de
                      forma eficiente.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.95,
                        fontWeight: 400,
                        lineHeight: 1.4,
                        mb: 6,
                        maxWidth: "90%",
                        color: theme.palette.primary.contrastText,
                      }}
                    >
                      Crea tu cuenta gratuita y comienza a gestionar tus
                      planillas de manera profesional. Solo te tomará unos
                      minutos configurar tu usuario.
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={3}
                      sx={{ mb: 6 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={onGetStarted}
                        endIcon={<ArrowForward />}
                        sx={{
                          px: 6,
                          py: 2.5,
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
                          px: 6,
                          py: 2.5,
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
              </Grid>

              {/* Right Side - Features */}
              <Grid item xs={12} lg={6}>
                <Fade in={open} timeout={1200}>
                  <Box>
                    <Typography
                      variant="h3"
                      component="h2"
                      gutterBottom
                      textAlign="center"
                      sx={{
                        fontWeight: 700,
                        mb: 6,
                        color: theme.palette.primary.contrastText,
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -16,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 80,
                          height: 4,
                          backgroundColor: theme.palette.secondary.light,
                          borderRadius: theme.shape.borderRadius,
                        },
                      }}
                    >
                      ¿Por qué elegir nuestra plataforma?
                    </Typography>

                    <Grid container spacing={4}>
                      {features.map((feature, index) => (
                        <Grid item xs={12} key={index}>
                          <Slide
                            direction="left"
                            in={open}
                            timeout={1000 + index * 300}
                          >
                            <Card
                              sx={{
                                backgroundColor: alpha(
                                  theme.palette.primary.contrastText,
                                  0.95
                                ),
                                backdropFilter: "blur(10px)",
                                border: `1px solid ${alpha(
                                  theme.palette.primary.contrastText,
                                  0.2
                                )}`,
                                borderRadius: theme.shape.borderRadius * 2,
                                transition: theme.transitions.create(
                                  ["transform", "box-shadow"],
                                  {
                                    duration:
                                      theme.transitions.duration.standard,
                                    easing: theme.transitions.easing.easeInOut,
                                  }
                                ),
                                "&:hover": {
                                  transform: "translateY(-8px) scale(1.02)",
                                  boxShadow: `0 20px 60px ${alpha(
                                    theme.palette.common.black,
                                    0.3
                                  )}`,
                                  backgroundColor:
                                    theme.palette.primary.contrastText,
                                },
                              }}
                            >
                              <CardContent sx={{ p: 4 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 3,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      color: theme.palette.primary.main,
                                      backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.1
                                      ),

                                      borderRadius:
                                        theme.shape.borderRadius * 1.5,
                                      p: 2,
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
                                      variant="h5"
                                      component="h3"
                                      gutterBottom
                                      sx={{
                                        fontWeight: 700,
                                        color: theme.palette.text.primary,
                                        mb: 2,
                                      }}
                                    >
                                      {feature.title}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        lineHeight: 1.6,
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
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Fade>
  );
};
export default WelcomeLarge;
