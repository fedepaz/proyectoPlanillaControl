import { useEffect, useState } from "react";
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { PlanillasNavbar } from "./components/PlanillasNavBar";
import { darkTheme, lightTheme } from "./types/theme";
import { useSession } from "./services/session";
import Loading from "./components/Loading";
import ErrorPage from "./components/Error";
import apiClient, { setCsrfToken } from "./services/csrfToken";
import { View, viewComponents } from "./views";

interface LoginResponse {
  authenticated: boolean;
  user: {
    dni: string;
    oficialId: {
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
    };
  };
}

export function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);

  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggleColorMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const { data, error, isError, isLoading, refetch } = useSession();

  useEffect(() => {
    if (!isLoading && data?.authenticated && !error) {
      setIsLoggedIn(true);
      setCurrentView(View.DASHBOARD);
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await apiClient.get<{ csrfToken: string }>(
          "/csrf-token"
        );
        if (response.data.csrfToken) {
          setCsrfToken(response.data.csrfToken);
        } else {
          console.error("Error fetching CSRF Token");
        }
      } catch (error) {
        console.error("Error fetching CSRF Token:", error);
      }
    };
    if (isLoggedIn) {
      fetchCsrfToken();
    } else {
      setCsrfToken("");
    }
  }, [isLoggedIn]);

  const handleLogin = (loginData: LoginResponse) => {
    setIsLoggedIn(loginData.authenticated);
    setCurrentView(isLoggedIn ? View.DASHBOARD : View.LOGIN);
  };
  const handleRegister = () => {
    setCurrentView(View.REGISTER);
  };
  const handleReset = () => {
    setCurrentView(View.RESET_PASSWORD);
  };
  const handleLogout = () => {
    setCurrentView(View.LOGOUT);
  };
  const handleGeneratePlanillas = () => {
    setCurrentView(View.GENERATE_PLANILLAS);
  };

  const handleBack = () => {
    setCurrentView(isLoggedIn ? View.DASHBOARD : View.LOGIN);
  };

  const viewProps = {
    onLogin: handleLogin,
    onRegister: () => handleRegister(),
    onResetPassword: () => handleReset(),
    onGeneratePlanillas: () => handleGeneratePlanillas(),
    onBackHome: () => handleBack(),
  };

  const CurrentViewComponent = viewComponents[currentView];

  if (isLoading) {
    return (
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
    );
  }

  if (isError) {
    return (
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
          <ErrorPage
            error={error}
            onRetry={() => {
              refetch();
            }}
          />
        </Box>
      </ThemeProvider>
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
            onBackHome={handleBack}
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
            <CurrentViewComponent {...viewProps} />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
