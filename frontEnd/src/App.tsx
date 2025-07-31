"use client";
import { useEffect, useState, useCallback } from "react";
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { PlanillasNavbar } from "./components/PlanillasNavBar";
import { darkTheme, lightTheme } from "./types/theme";

import Loading from "./components/Loading";
import ErrorPage from "./components/Error";
import apiClient, { setCsrfToken } from "./services/csrfToken";
import { View, viewComponents } from "./views";

import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./provider/AuthContextProvider";

const csrfTokenRoute = "/csrf-token";

function AppContent() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const {
    user,
    userInfo,
    isLoggedIn,
    isLoading,
    error,
    isError,
    currentView,
    //setUser,
    //setCurrentView,
    //setIsLoggedIn,
    refetch,
    handleLogin,
    handleLogout,
    handleNavigate,
    handleBack,
  } = useAuth();

  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggleColorMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await apiClient.get<{ csrfToken: string }>(
          csrfTokenRoute
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

  const handleRegister = useCallback(() => {
    handleNavigate(View.REGISTER);
  }, [handleNavigate]);

  const handleReset = useCallback(() => {
    handleNavigate(View.RESET_PASSWORD);
  }, [handleNavigate]);

  const handleGeneratePlanillas = useCallback(() => {
    handleNavigate(View.GENERATE_PLANILLAS);
  }, [handleNavigate]);

  const viewProps = {
    onLogin: handleLogin,
    onRegister: handleRegister,
    onResetPassword: handleReset,
    onGeneratePlanillas: handleGeneratePlanillas,
    onBackHome: handleBack,
    onNavigate: handleNavigate,
    user,
    userInfo,
    isLoggedIn,
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
          userInfo={userInfo}
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
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
