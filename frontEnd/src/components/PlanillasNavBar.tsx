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
import CloseSessionButton from "./CloseSessionButton";

import BackHomeButton from "./BackHomeButton";

interface PlanillasNavbarProps {
  toggleColorMode: () => void;
  onLogout: (data: boolean) => void;
  onBackHome: (data: boolean) => void;
  isLoggedIn: boolean;
}

export function PlanillasNavbar({
  toggleColorMode,
  onLogout,
  onBackHome,
  isLoggedIn,
}: PlanillasNavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onLogoutButton = () => {
    onLogout(true);
  };
  const onBackButton = () => {
    console.log("PlanillasNavbar");
    onBackHome(true);
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
              sx={{
                flexGrow: 1,
                minWidth: isMobile ? "auto" : 150,
                mr: 2,
                placeItems: "flex-start",
              }}
            >
              {isMobile ? (
                <BackHomeButton onComeBackHome={onBackButton} />
              ) : (
                <BackHomeButton onComeBackHome={onBackButton} />
              )}
            </Typography>
            {isLoggedIn && <CloseSessionButton onLogout={onLogoutButton} />}
            <IconButton
              sx={{ display: "grid", placeItems: "center" }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <WbSunnyTwoToneIcon />
              ) : (
                <Brightness2TwoToneIcon />
              )}
              <Typography variant="caption" component="span">
                {theme.palette.mode === "dark" ? "Modo Claro" : "Modo Oscuro"}
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
