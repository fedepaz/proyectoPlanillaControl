import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  Box,
  useMediaQuery,
} from "@mui/material";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import Brightness2TwoToneIcon from "@mui/icons-material/Brightness2TwoTone";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CloseSessionButton from "./CLoseSessionButton";
import { useState } from "react";

interface PlanillasNavbarProps {
  toggleColorMode: () => void;
  onLogout: (data: boolean) => void;
  isLoggedIn: boolean;
}

export function PlanillasNavbar({
  toggleColorMode,
  onLogout,
  isLoggedIn,
}: PlanillasNavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onLogoutButton = () => {
    onLogout(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, minWidth: isMobile ? "auto" : 150, mr: 2 }}
            >
              {isMobile ? "Planillas" : "Planillas Page"}
            </Typography>
            {isLoggedIn && <CloseSessionButton onLogout={onLogoutButton} />}
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <WbSunnyTwoToneIcon />
              ) : (
                <Brightness2TwoToneIcon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
