"use client";
import type React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import {
  Close as CloseIcon,
  Assignment as AssignmentIcon,
  Speed as SpeedIcon,
  CloudSync as CloudSyncIcon,
} from "@mui/icons-material";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

const features = [
  {
    icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
    title: "Gestión de Planillas",
    description:
      "Crea y administra tus planillas de forma digital y organizada",
  },

  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: "Proceso Rápido",
    description: "Genera y procesa planillas en minutos, no en horas",
  },
  {
    icon: <CloudSyncIcon sx={{ fontSize: 40 }} />,
    title: "Acceso Desde Cualquier Lugar",
    description:
      "Accede a tus planillas desde cualquier dispositivo, en cualquier momento",
  },
];

const WelcomeModal: React.FC<WelcomeModalProps> = ({
  open,
  onClose,
  onGetStarted,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Helper function to get a slightly lighter background color
  const getLighterBackground = () => {
    if (theme.palette.mode === "dark") {
      // In dark mode, make it slightly lighter than the default background
      return "rgba(255, 255, 255, 0.02)";
    } else {
      // In light mode, make it slightly darker/grayer than white
      return "rgba(0, 0, 0, 0.02)";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          m: isMobile ? 0 : 2,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "white",
            p: { xs: 3, md: 4 },
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ pr: 4 }}
          >
            Bienvenido a PlanillasPro
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{ opacity: 0.9, maxWidth: "80%" }}
          >
            La plataforma profesional para gestionar tus planillas de forma
            eficiente
          </Typography>
        </Box>

        {/* Features Section */}
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            textAlign="center"
            fontWeight="600"
            sx={{ mb: 4 }}
          >
            ¿Por qué elegir nuestra plataforma?
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s ease-in-out",
                    backgroundColor: getLighterBackground(),
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.04)"
                          : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      fontWeight="600"
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* CTA Section */}
          <Box
            sx={{
              mt: 5,
              p: { xs: 3, md: 4 },
              backgroundColor: getLighterBackground(),
              borderRadius: 2,
              textAlign: "center",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.05)"
                  : "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="600"
            >
              ¿Listo para comenzar?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
            >
              Crea tu cuenta gratuita y comienza a gestionar tus planillas de
              manera profesional. Solo te tomará unos minutos configurar tu
              usuario.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                onClick={onGetStarted}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  minWidth: { xs: "100%", sm: 200 },
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
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  minWidth: { xs: "100%", sm: 200 },
                }}
              >
                Ya tengo cuenta
              </Button>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
