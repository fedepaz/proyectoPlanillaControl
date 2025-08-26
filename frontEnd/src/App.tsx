"use client";
import React, { useEffect, useState, useCallback } from "react";

import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

import { PlanillasNavbar } from "./components/PlanillasNavBar";
import { darkTheme, lightTheme } from "./types/theme";

import Loading from "./components/Loading";
import ErrorPage from "./components/Error";

import { viewComponents } from "./views";
import { View } from "./types/types";

import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./provider/AuthContextProvider";
import WelcomeModal from "./login/components/WelcomeModal";
import { PlanillaStepProvider } from "./provider/PlanillaStepProvider";

function AppContent() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const [showWelcome, setShowWelcome] = useState(false);
  const [shouldLoadWelcome, setShouldLoadWelcome] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {
    user,
    userInfo,
    isLoggedIn,
    isLoading,
    error,
    isError,
    currentView,
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
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (!hasSeenWelcome && !isLoggedIn && !isLoading && !isError) {
      setShouldLoadWelcome(true);
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [isLoggedIn, isLoading, isError]);

  const handleWelcomeClose = useCallback(() => {
    setShowWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
  }, []);

  const handleGetStarted = useCallback(() => {
    setShowWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
    handleNavigate(View.REGISTER);
  }, [handleNavigate]);

  useEffect(() => {
    if (currentView !== View.GENERATE_PLANILLAS) {
      setCurrentStep(null);
      setIsReviewing(false);
    }
  }, [currentView]);

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
    onToggleDrawer: handleDrawerToggle,
    mobileOpen,
  };

  const CurrentViewComponent = viewComponents[currentView];

  const effectiveStep = isReviewing ? 6 : currentStep;

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

  if (
    isError &&
    error &&
    typeof error === "object" &&
    currentView !== View.GENERATE_PLANILLAS
  ) {
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
          minHeight: "100vh",
          width: "100%",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #1a1c20 0%, #2a2d32 100%)"
              : "linear-gradient(180deg, #f5f7fa 0%, #e6e9ee 100%)",
        }}
      >
        <PlanillaStepProvider step={effectiveStep}>
          <PlanillasNavbar
            toggleColorMode={toggleColorMode}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            onBackHome={handleBack}
            userInfo={userInfo}
            onDrawerToggle={
              currentView === View.DASHBOARD ? handleDrawerToggle : undefined
            }
          />
        </PlanillaStepProvider>
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
          <React.Suspense fallback={<Loading />}>
            <CurrentViewComponent
              {...viewProps}
              setPlanillaStep={setCurrentStep}
              setIsReviewing={setIsReviewing}
            />
          </React.Suspense>
        </Box>

        {shouldLoadWelcome && (
          <React.Suspense fallback={<Loading />}>
            <WelcomeModal
              open={showWelcome}
              onClose={handleWelcomeClose}
              onGetStarted={handleGetStarted}
            />
          </React.Suspense>
        )}
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
