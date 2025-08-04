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
import { User } from "../../actions/types";
import { useDashboardActions } from "../../actions";
import { memo } from "react";
import { View } from "../../types/types";
import { RoleBadge } from "../../components/RoleBadge";
interface DashboardProps {
  onGeneratePlanillas?: () => void;
  onHistorialSupervisores?: () => void;
  onHistorialResponsables?: () => void;
  onHistorialAuxiliares?: () => void;
  onUserRoles?: () => void;
  onReports?: () => void;
  onViewHistory?: () => void;
  onViewProfile?: () => void;
  onOpenSettings?: () => void;
  onManageUsers?: () => void;
  onNavigate?: (view: View) => void;
  user: User;
}

const Dashboard = memo(function Dashboard({
  onGeneratePlanillas,
  onHistorialSupervisores,
  onHistorialResponsables,
  onHistorialAuxiliares,
  onUserRoles,
  onReports,
  onViewHistory,
  onViewProfile,
  onOpenSettings,
  onManageUsers,
  onNavigate,
  user,
}: DashboardProps) {
  const {
    mainActions,
    accountActions,
    settingsActions,
    reportsActions,
    adminActions,
    effectiveRoles,
  } = useDashboardActions(
    {
      onGeneratePlanillas,
      onHistorialSupervisores,
      onHistorialResponsables,
      onHistorialAuxiliares,
      onUserRoles,
      onReports,
      onViewHistory,
      onViewProfile,
      onOpenSettings,
      onManageUsers,
      onNavigate,
    },
    user
  );

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
        {/* Role indicator */}
        {effectiveRoles.length > 0 && (
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                mr: 1,
                color: "text.secondary",
              }}
            >
              Rol :
            </Typography>
            {effectiveRoles.map((role) => (
              <RoleBadge key={role} role={role} />
            ))}
          </Box>
        )}
        {/* Main Actions Section */}
        {mainActions.length > 0 && (
          <Box
            sx={{
              mb: 3,
              width: "100%",
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
              {mainActions.map((action) => (
                <Grid item xs={12} sm={10} key={action.id}>
                  <Button
                    fullWidth
                    variant={action.primary ? "contained" : "outlined"}
                    size="large"
                    startIcon={action.icon}
                    onClick={action.onClick}
                    sx={{
                      py: 1.5,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {action.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Reports Actions Section */}
        {reportsActions.length > 0 && (
          <>
            <Divider sx={{ my: 3, width: "100%" }} />
            <Box
              sx={{
                width: "100%",
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
                Reportes
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {reportsActions.map((action) => (
                  <Grid item xs={12} sm={10} key={action.id}>
                    <Button
                      fullWidth
                      variant={action.primary ? "contained" : "outlined"}
                      size="large"
                      startIcon={action.icon}
                      onClick={action.onClick}
                      sx={{
                        py: 1.5,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

        {/* Account Actions Section */}
        {accountActions.length > 0 && (
          <>
            <Divider sx={{ my: 3, width: "100%" }} />
            <Box
              sx={{
                width: "100%",
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
                Mi Cuenta
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {accountActions.map((action) => (
                  <Grid item xs={12} sm={10} key={action.id}>
                    <Button
                      fullWidth
                      variant={action.primary ? "contained" : "outlined"}
                      size="large"
                      startIcon={action.icon}
                      onClick={action.onClick}
                      sx={{
                        py: 1.5,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
        {/* Settings Actions Section */}
        {settingsActions.length > 0 && (
          <>
            <Divider sx={{ my: 3, width: "100%" }} />
            <Box
              sx={{
                width: "100%",
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
                Configuración
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {settingsActions.map((action) => (
                  <Grid item xs={12} sm={10} key={action.id}>
                    <Button
                      fullWidth
                      variant={action.primary ? "contained" : "outlined"}
                      size="large"
                      startIcon={action.icon}
                      onClick={action.onClick}
                      sx={{
                        py: 1.5,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

        {/* canAccessAdmin */}

        {/* Admin Actions Section */}
        {adminActions.length > 0 && (
          <>
            <Divider sx={{ my: 3, width: "100%" }} />
            <Box
              sx={{
                width: "100%",
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
                Administración
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {adminActions.map((action) => (
                  <Grid item xs={12} sm={10} key={action.id}>
                    <Button
                      fullWidth
                      variant={action.primary ? "contained" : "outlined"}
                      size="large"
                      startIcon={action.icon}
                      onClick={action.onClick}
                      sx={{
                        py: 1.5,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
});

export default Dashboard;
