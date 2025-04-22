"use client";
import {
  Button,
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
interface DashboardProps {
  onGeneratePlanillas: (data: boolean) => void;
  userRole?: "admin" | "user";
}

export function Dashboard({
  onGeneratePlanillas,
  userRole = "user",
}: DashboardProps) {
  const handleGenerarPlanillas = () => {
    onGeneratePlanillas(true);
  };

  const actionButtons = [
    {
      id: "generate",
      label: "Generar Planillas",
      icon: <NoteAddIcon />,
      onClick: handleGenerarPlanillas,
      primary: true,
      visible: true,
    },
    {
      id: "history",
      label: "Historial",
      icon: <HistoryIcon />,
      onClick: () => console.log("History"),
      primary: false,
      visible: true,
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <SettingsIcon />,
      onClick: () => console.log("Settings"),
      primary: false,
      visible: true,
    },
  ];

  const accountButtons = [
    {
      id: "profile",
      label: "Perfil",
      icon: <PersonIcon />,
      onClick: () => console.log("Profile"),
      visible: true,
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <SettingsIcon />,
      onClick: () => console.log("Settings"),
      visible: true,
    },
  ];

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 500,
            pb: 1,
            textAlign: "center",
          }}
        >
          Panel de Control
        </Typography>
        <Box
          sx={{
            mb: 3,
            widht: "100%",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              mb: 1,
              textAlign: "center",
            }}
          >
            Acciones Principales
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {actionButtons
              .filter((button) => button.visible)
              .map((button) => (
                <Grid item xs={12} sm={10} md={6} key={button.id}>
                  <Button
                    fullWidth
                    variant={button.primary ? "contained" : "outlined"}
                    size="large"
                    startIcon={button.icon}
                    sx={{
                      py: 1.5,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {button.label}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              mb: 1,
              textAlign: "center",
            }}
          >
            Mi Cuenta
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {accountButtons
              .filter((button) => button.visible)
              .map((button) => (
                <Grid item xs={12} sm={10} md={6} key={button.id}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={button.icon}
                    onClick={button.onClick}
                    sx={{
                      py: 1.5,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {button.label}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
