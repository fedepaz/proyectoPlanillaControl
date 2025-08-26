import type React from "react";

import {
  Avatar,
  Badge,
  Box,
  Chip,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CloseSessionButton from "./CloseSessionButton";
import BackHomeButton from "./BackHomeButton";
import ThemeModeButton from "./ThemeModeButton";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import BadgeIcon from "@mui/icons-material/Badge";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HelpButton from "../login/components/helpComponents/HelpButton";
import { LoginResponse } from "../types/auth";

interface PlanillasNavbarProps {
  toggleColorMode: () => void;
  onLogout: (logout: boolean) => void;
  onBackHome: (backHome: boolean) => void;
  isLoggedIn: boolean;
  userInfo: LoginResponse;
  onDrawerToggle: (() => void) | undefined;
}

export function PlanillasNavbar({
  toggleColorMode,
  onLogout,
  onBackHome,
  isLoggedIn,
  userInfo,
  onDrawerToggle,
}: PlanillasNavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onLogoutButton = () => {
    onLogout(true);
  };

  const onBackButton = () => {
    onBackHome(true);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Format user information
  const getUserInitials = () => {
    if (!userInfo?.user?.oficialId) return "U";

    const { firstname, lastname } = userInfo.user.oficialId;
    if (firstname === undefined || lastname === undefined) return "U";

    return `${firstname.charAt(0)}${lastname.charAt(0)}`;
  };

  const getFullName = () => {
    if (!userInfo?.user?.oficialId) return "";

    const { firstname, lastname } = userInfo.user.oficialId;
    if (firstname === undefined || lastname === undefined) return "";
    return `${firstname} ${lastname}`;
  };

  const getFormattedRole = () => {
    if (!userInfo?.user) return "";

    // Format role - capitalize first letter
    const role = userInfo.user.role;
    if (role === undefined) return "";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getFormattedRank = () => {
    if (!userInfo?.user?.oficialId?.jerarquiaId) return "";

    // Format rank - capitalize first letter

    const rank = userInfo.user.oficialId.jerarquiaId.jerarquia;
    if (rank === undefined) return "";
    return rank.charAt(0).toUpperCase() + rank.slice(1);
  };

  // Get airport code
  const getAirportCode = () => {
    if (!userInfo?.user?.oficialId?.currentAirportId) return "";

    if (userInfo.user.oficialId.currentAirportId === undefined) return "";
    return userInfo.user.oficialId.currentAirportId.codIATA;
  };

  // Get legajo (ID number)
  const getLegajo = () => {
    if (!userInfo?.user?.oficialId) return "";
    if (userInfo.user.oficialId === undefined) return "";

    return userInfo.user.oficialId.legajo;
  };

  // Determine if user has admin role
  const isAdmin = userInfo?.user?.role === "admin";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Toolbar
          sx={{
            minHeight: "48px !important",
            py: 0,
            px: 1,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Left side - Back button and app title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {isMobile && onDrawerToggle && (
              <IconButton
                aria-label="open drawer"
                onClick={onDrawerToggle}
                sx={{
                  color: 'text.primary',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px 8px",
                  borderRadius: 1,
                  minWidth: "auto",
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            {!onDrawerToggle && (
              <BackHomeButton onComeBackHome={onBackButton} />
            )}

            {!isMobile && (
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: 500, fontSize: "1rem" }}
              >
                Planillas
              </Typography>
            )}
          </Box>

          {/* Right side - User info and actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {isLoggedIn && userInfo && (
              <>
                {/* Airport chip - always visible */}
                <Tooltip
                  title={userInfo.user.oficialId.currentAirportId.aeropuerto}
                >
                  <Chip
                    icon={
                      <FlightTakeoffIcon
                        sx={{
                          color: "3a73b2",
                        }}
                      />
                    }
                    label={getAirportCode()}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      height: "24px",
                      display: { xs: "none", sm: "flex" },
                      "& .MuiChip-label": { px: 1 },
                      "& .MuiChip-icon": { ml: 0.5 },
                    }}
                  />
                </Tooltip>

                {/* User profile button */}
                <Tooltip title="Ver perfil">
                  <IconButton
                    onClick={handleProfileClick}
                    size="small"
                    sx={{ p: 0.5 }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        isAdmin ? (
                          <Tooltip title="Administrador">
                            <AdminPanelSettingsIcon
                              color="primary"
                              sx={{
                                fontSize: 14,
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: "50%",
                              }}
                            />
                          </Tooltip>
                        ) : null
                      }
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: theme.palette.primary.main,
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {getUserInitials()}
                      </Avatar>
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Dialog
                  open={open}
                  onClose={handleProfileClose}
                  sx={{
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",

                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(42, 45, 50, 0.8)"
                          : "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(20px)",
                      borderRight: `1px solid ${theme.palette.divider}`,
                    },
                  }}
                >
                  <Paper sx={{ p: 2, maxWidth: 300, minWidth: 250 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: theme.palette.primary.main,
                          mr: 1.5,
                        }}
                      >
                        {getUserInitials()}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500, lineHeight: 1.2 }}
                        >
                          {getFullName()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getFormattedRole()} • {getFormattedRank()}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BadgeIcon
                          fontSize="small"
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                        <Typography variant="body2">
                          Legajo: <strong>{getLegajo()}</strong>
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AirplaneTicketIcon
                          fontSize="small"
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                        <Typography variant="body2">
                          Aeropuerto: <strong>{getAirportCode()}</strong>
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 0.5 }}
                        >
                          ({userInfo.user.oficialId.currentAirportId.codOACI})
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <CloseSessionButton onLogout={onLogoutButton} />
                    </Box>
                  </Paper>
                </Dialog>
              </>
            )}
            {/* Botón de ayuda contextual */}
            <HelpButton />

            {/* Theme toggle button - always visible */}
            <ThemeModeButton toggleColorMode={toggleColorMode} />
          </Box>
        </Toolbar>
      </Box>
    </ThemeProvider>
  );
}
