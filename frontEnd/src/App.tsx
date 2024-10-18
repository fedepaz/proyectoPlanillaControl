import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { PlanillasNavbar } from "./components/PlanillasNavBar";
import { darkTheme, lightTheme } from "./types/theme";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { LoginPage } from "./login/components/LoginPage";
import { RegisterPage } from "./login/components/RegisterPage";
import { LogoutPage } from "./login/components/LogoutPage";
import { useSession } from "./services/session";
import Loading from "./components/Loading";
import Dashboard from "./login/components/Dashboard";
import { PlanillasProvider } from "./planillas/components/PlanillasProvider";

interface LoginResponse {
  dni: string;
}
enum View {
  DASHBOARD = "dashboard",
  LOGOUT = "logout",
  GENERATE_PLANILLAS = "generate_planillas",
}

export function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dni, setDni] = useState<string>("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogoutPage, setShowLogoutPage] = useState(false);
  const [showGeneratePlanillas, setShowGeneratePlanillas] = useState(false);

  const { data, error, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading) {
      if (data && !error) {
        setDni(data.dni || "");
        setIsLoggedIn(true);
      }
    }
  }, [data, error, isLoading]);

  const handleLogin = (data: LoginResponse) => {
    setDni(data.dni);
    setIsLoggedIn(true);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleColorMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  const handleRegister = (info: boolean) => {
    setShowRegister(info);
  };

  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const handleLogout = () => {
    setShowLogoutPage(true);
    setShowGeneratePlanillas(false);
    setCurrentView(View.LOGOUT);
  };

  const handleGeneratePlanillas = () => {
    setShowGeneratePlanillas(true);
    setCurrentView(View.GENERATE_PLANILLAS);
  };

  const handleBackToDashboard = () => {
    setShowGeneratePlanillas(false);
    setCurrentView(View.DASHBOARD);
  };

  const renderLoggedInContent = () => {
    switch (currentView) {
      case View.LOGOUT:
        return <LogoutPage darkMode={isDarkMode} />;
      case View.GENERATE_PLANILLAS:
        return <PlanillasProvider onBack={handleBackToDashboard} />;
      default:
        return <Dashboard onGeneratePlanillas={handleGeneratePlanillas} />;
    }
  };

  if (isLoading) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              minHeight: "100vh",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Loading />;
          </Box>
        </ThemeProvider>
      </>
    );
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minHeight: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <PlanillasNavbar
            toggleColorMode={toggleColorMode}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            onBackHome={handleBackToDashboard}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              overflowY: "hidden",
              WebkitOverflowScrolling: "touch",
              p: { xs: 1, sm: 2, md: 3 },
            }}
          >
            {isLoggedIn ? (
              renderLoggedInContent()
            ) : showRegister ? (
              <RegisterPage onRegisterBack={() => setShowRegister(false)} />
            ) : (
              <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
