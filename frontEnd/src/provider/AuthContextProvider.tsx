import { ReactNode, useState, useEffect, useCallback } from "react";
import { User, validateAndCreateUser } from "../actions/types";
import { useSession } from "../services/session";
import { useLogout } from "../login/services/logout";
import { View } from "../types/types";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { LoginResponse } from "../types/auth";
import { sessionBackup } from "../services/sessionBackup";

const defaultUserInfo: LoginResponse = {
  authenticated: false,
  message: "",
  user: {
    dni: "",
    oficialId: {
      id: "",
      dni: "",
      firstname: "",
      lastname: "",
      legajo: "",
      currentAirportId: {
        id: "",
        aeropuerto: "",
        codIATA: "",
        codOACI: "",
      },
      jerarquiaId: {
        jerarquia: "",
        id: "",
      },
    },
    role: "",
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, error, isError, isLoading, refetch } = useSession();
  const { mutate: logout } = useLogout();
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<LoginResponse>(defaultUserInfo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);

  useEffect(() => {
    if (!isLoading && data?.authenticated && !error) {
      setIsLoggedIn(true);
      setUserInfo(data);
      setCurrentView(View.DASHBOARD);
      const validatedUser = validateAndCreateUser(
        data.user.role,
        data.user.oficialId.jerarquiaId.jerarquia
      );
      setUser(validatedUser);
    } else if (!isLoading && (!data?.authenticated || error)) {
      setIsLoggedIn(false);
      setUser(null);
      setUserInfo(defaultUserInfo);
      setCurrentView(View.LOGIN);
    }
  }, [data, error, isLoading]);

  const handleLogin = useCallback((loginData: LoginResponse) => {
    setIsLoggedIn(loginData.authenticated);
    setUserInfo(loginData);

    if (loginData.authenticated) {
      if (!navigator.cookieEnabled && loginData.accessToken) {
        console.log("Cookies disabled. Storing token in sessionStorage.");
        sessionStorage.setItem("accessToken", loginData.accessToken);
      } else {
        console.log("Cookies enabled. Using cookie-based auth.");
      }
      if (loginData.user.role) {
        const validatedUser = validateAndCreateUser(
          loginData.user.role,
          loginData.user.oficialId.jerarquiaId.jerarquia
        );
        setUser(validatedUser);
      }
      setCurrentView(View.DASHBOARD);
    } else {
      setCurrentView(View.LOGIN);
    }
  }, []);

  const handleLogout = useCallback(() => {
    logout(undefined, {
      onSuccess: () => {
        setIsLoggedIn(false);
        setUser(null);
        setUserInfo(defaultUserInfo);
        setCurrentView(View.LOGIN);
        sessionBackup.clear();
      },
    });
  }, [logout]);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView(isLoggedIn ? View.DASHBOARD : View.LOGIN);
  }, [isLoggedIn]);

  const value: AuthContextType = {
    user,
    userInfo,
    isLoggedIn,
    isLoading,
    error,
    isError,
    currentView,
    setUser,
    setCurrentView,
    setIsLoggedIn,
    refetch,
    handleLogin,
    handleLogout,
    handleNavigate,
    handleBack,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
