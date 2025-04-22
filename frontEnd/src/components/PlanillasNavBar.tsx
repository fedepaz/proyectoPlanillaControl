import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Box,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CloseSessionButton from "./CloseSessionButton";

import BackHomeButton from "./BackHomeButton";
import ThemeModeButton from "./ThemeModeButton";

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
    onBackHome(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            minHeight: "48px",
          }}
        >
          <Toolbar
            sx={{
              minHeight: "48px !important",
              py: 0,
              px: 1,
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                minWidth: isMobile ? "auto" : 150,
                display: "flex",
                alignItems: "center",
              }}
            >
              {isMobile ? (
                <BackHomeButton onComeBackHome={onBackButton} />
              ) : (
                <BackHomeButton onComeBackHome={onBackButton} />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                minWidth: isMobile ? "auto" : 150,
              }}
            >
              {isLoggedIn && <CloseSessionButton onLogout={onLogoutButton} />}
              <ThemeModeButton toggleColorMode={toggleColorMode} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
