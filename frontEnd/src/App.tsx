"use client";
import { useEffect, useState, useCallback } from "react";
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { PlanillasNavbar } from "./components/PlanillasNavBar";
import { darkTheme, lightTheme } from "./types/theme";
import { useSession } from "./services/session";
import Loading from "./components/Loading";
import ErrorPage from "./components/Error";
import apiClient, { setCsrfToken } from "./services/csrfToken";
import { View, viewComponents } from "./views";
import { UserRole } from "./actions/types";

const csrfTokenRoute = "/csrf-token";
interface LoginResponse {
  authenticated: boolean;
  user: {
    dni: string;
    oficialId: {
      dni: string;
      firstname: string;
      lastname: string;
      legajo: string;
      currentAirportId: {
        aeropuerto: string;
        codIATA: string;
        codOACI: string;
      };
      jerarquiaId: {
        jerarquia: string;
      };
    };
    role: string;
  };
}

function ensureUserRole(role: string): UserRole {
  if (Object.values(UserRole).includes(role as UserRole)) {
    return role as UserRole;
  }

  return UserRole.AUXILIAR;
}

export function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.AUXILIAR);
  const [userInfo, setUserInfo] = useState<LoginResponse>({
    authenticated: false,
    user: {
      dni: "",
      oficialId: {
        dni: "",
        firstname: "",
        lastname: "",
        legajo: "",
        currentAirportId: {
          aeropuerto: "",
          codIATA: "",
          codOACI: "",
        },
        jerarquiaId: {
          jerarquia: "",
        },
      },
      role: "",
    },
  });

  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggleColorMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  const { data, error, isError, isLoading, refetch } = useSession();

  useEffect(() => {
    if (!isLoading && data?.authenticated && !error) {
      setIsLoggedIn(true);
      setUserInfo(data);
      setCurrentView(View.DASHBOARD);
      if (data.user.role) {
        setUserRole(ensureUserRole(data.user.role));
      }
    }
  }, [data, error, isLoading]);

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

  const handleLogin = useCallback((loginData: LoginResponse) => {
    setIsLoggedIn(loginData.authenticated);
    if (loginData.authenticated) {
      if (loginData.user.role) {
        setUserRole(ensureUserRole(loginData.user.role));
      }
      setCurrentView(View.DASHBOARD);
    } else {
      setCurrentView(View.LOGIN);
    }
  }, []);
  const handleRegister = useCallback(() => {
    setCurrentView(View.REGISTER);
  }, []);
  const handleReset = useCallback(() => {
    setCurrentView(View.RESET_PASSWORD);
  }, []);
  const handleLogout = useCallback(() => {
    setCurrentView(View.LOGOUT);
  }, []);
  const handleGeneratePlanillas = useCallback(() => {
    setCurrentView(View.GENERATE_PLANILLAS);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView(isLoggedIn ? View.DASHBOARD : View.LOGIN);
  }, [isLoggedIn]);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const viewProps = {
    onLogin: handleLogin,
    onRegister: () => handleRegister(),
    onResetPassword: () => handleReset(),
    onGeneratePlanillas: () => handleGeneratePlanillas(),
    onBackHome: () => handleBack(),
    onNavigate: handleNavigate,
    userRole,
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
