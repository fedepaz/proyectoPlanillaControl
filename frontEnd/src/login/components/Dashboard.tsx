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
import { UserRole } from "../../actions/types";
import { useDashboardActions } from "../../actions";
import { memo } from "react";
import { View } from "../../views";
interface DashboardProps {
  onGeneratePlanillas: () => void;
  onViewHistory: () => void;
  onViewProfile: () => void;
  onOpenSettings: () => void;
  onManageUsers: () => void;
  onNavigate?: (view: View) => void;
  userRole: UserRole;
}

export const Dashboard = memo(function Dashboard({
  onGeneratePlanillas,
  onViewHistory,
  onViewProfile,
  onOpenSettings,
  onManageUsers,
  onNavigate,
  userRole,
}: DashboardProps) {
  const { mainActions, accountActions, adminActions } = useDashboardActions(
    {
      onGeneratePlanillas,
      onViewHistory,
      onViewProfile,
      onOpenSettings,
      onManageUsers,
      onNavigate,
    },
    userRole
  );

  function formatRoleName(role: UserRole): string {
    const roleString = role.toString();
    return roleString.charAt(0).toUpperCase() + roleString.slice(1);
  }

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
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Rol: {formatRoleName(userRole)}
        </Typography>

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
